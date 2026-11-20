import { useEffect, useRef } from 'react'

/* The hero's light and the glass it shines through, drawn by one WebGL shader.

   A wide, faint light drifts on smooth 1-D noise behind the wordmark, never repeating
   a loop. Where it falls it lifts a fine grain and the page's hairlines out of the dark,
   and it catches beads of water on the "glass": each bead is a tiny lens, so it shows a
   flipped, magnified piece of what's behind it, with a darker edge and a glint. Beads
   come and go slowly, as if the glass is drying and misting again. Behind the glass,
   fine rain falls through the light.

   Without WebGL, or with reduced motion, the canvas isn't used and the CSS version of
   the glow and grain (index.css, .hero-light) shows instead, holding still. */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;    // canvas size in device pixels
uniform float uScale; // device pixels per CSS pixel
uniform vec2 uLight;  // light position in CSS pixels
uniform float uTime;  // seconds

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec2 hash2(vec2 p) { return vec2(hash(p), hash(p + 19.19)); }

// The light's reach, matching the CSS fallback: min(48rem, 100vw).
float reach() { return min(768.0, uRes.x / uScale); }

float lightAt(vec2 p) {
  return clamp(1.0 - length(p - uLight) / (reach() * 0.75), 0.0, 1.0);
}

// Falling rain: thin streaks in sparse columns, slanted a little by the wind. Each column
// has its own speed and phase; a streak is brightest at its leading (lower) end.
float rain(vec2 p, float cw, float period, float len, float speed, float width, float salt) {
  vec2 r = vec2(p.x + p.y * 0.18, p.y);
  float col = floor(r.x / cw);
  if (hash(vec2(col, salt)) > 0.7) return 0.0;
  float cx = (col + 0.2 + 0.6 * hash(vec2(col, salt + 1.0))) * cw;
  float line = 1.0 - smoothstep(width * 0.5, width * 0.5 + 0.8, abs(r.x - cx));
  float sp = speed * (0.8 + 0.4 * hash(vec2(col, salt + 2.0)));
  float y = mod(r.y - uTime * sp + hash(vec2(col, salt + 3.0)) * period, period);
  return line * smoothstep(0.0, len, y) * step(y, len);
}

// What's behind the glass: the glow, rain, and grain and hairlines where the light falls.
vec3 scene(vec2 p) {
  float w = uRes.x / uScale;
  float d = length(p - uLight);
  float wide = clamp(1.0 - d / (min(896.0, 1.2 * w) * 0.72), 0.0, 1.0);
  float core = clamp(1.0 - d / (min(480.0, 0.7 * w) * 0.72), 0.0, 1.0);
  vec3 col = vec3(1.0) * 0.03 * wide + vec3(0.77, 0.71, 0.99) * 0.02 * core;

  float L = lightAt(p);
  // Fine grain at device-pixel scale, like the CSS fallback's fractal noise.
  float grain = hash(floor(p * uScale)) * 0.07;
  // Hairlines at -60deg every 46px, as in the page texture.
  float s = mod(dot(p, vec2(-0.866, -0.5)), 46.0);
  float line = (1.0 - smoothstep(0.0, 1.2, min(s, 46.0 - s))) * 0.06 * 0.3;
  col += vec3(grain + line) * L;

  // Rain shows only in the light, like rain under a streetlamp: near and far layers.
  float wet = rain(p, 23.0, 800.0, 100.0, 900.0, 1.0, 3.0) * 0.16
            + rain(p, 11.0, 500.0, 50.0, 500.0, 0.6, 9.0) * 0.08;
  col += vec3(0.78, 0.82, 0.92) * wet * pow(L, 1.5);
  return col;
}

// One grid of beads. Each cell may hold a bead that lives ~24s, fading in and out.
void beads(vec2 p, float cell, float rMin, float rMax, float density, float salt,
           inout vec2 bq, inout vec2 bc, inout float br, inout float bfade) {
  vec2 id = floor(p / cell);
  float ph = hash(id + salt + 7.1);
  float age = uTime / 24.0 + ph;
  vec2 sid = id + salt + floor(age) * 17.0;
  if (hash(sid) > density) return;
  float r = mix(rMin, rMax, pow(hash(sid + 3.3), 3.0));
  vec2 c = (id + 0.5 + (hash2(sid) - 0.5) * (1.0 - 2.4 * r / cell)) * cell;
  vec2 q = (p - c) / vec2(r, r * 1.08);
  if (length(q) < 1.0 + 1.5 / r) {
    float t = fract(age);
    bq = q; bc = c; br = r;
    bfade = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.92, t);
  }
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uScale;
  vec3 col = scene(p);
  float dark = 0.0;

  vec2 bq = vec2(0.0); vec2 bc = vec2(0.0); float br = 0.0; float bfade = 0.0;
  beads(p, 14.0, 0.6, 2.0, 0.30, 0.0, bq, bc, br, bfade);   // mist
  beads(p, 40.0, 2.2, 7.5, 0.45, 51.0, bq, bc, br, bfade);  // beads

  if (br > 0.0) {
    float d = length(bq);
    float inside = (1.0 - smoothstep(1.0 - 1.2 / br, 1.0, d)) * bfade;
    float Lc = lightAt(bc);
    // A lens: flipped and magnified, gathering light into its middle...
    vec3 refr = scene(bc - bq * br * 1.8) * 1.6 + vec3(0.05 * Lc * (1.0 - d * d));
    col = mix(col, refr, inside);
    // ...with a dark edge where the glass curves away (strongest at the top)...
    float edge = smoothstep(0.55, 1.0, d) * (0.75 - 0.25 * bq.y);
    col *= 1.0 - edge * inside;
    dark = inside * edge * 0.45 * (0.25 + 0.75 * Lc);
    // ...and a pinpoint glint.
    float glint = 1.0 - smoothstep(0.0, 0.2, length(bq - vec2(-0.3, -0.42)));
    col += vec3(glint * step(2.2, br) * 0.6 * Lc * inside);
  }

  // Dither so the faint gradients don't band.
  col = max(col + (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0, 0.0);
  float alpha = clamp(max(col.r, max(col.g, col.b)) + dark, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha); // premultiplied
}
`

/** Smooth value noise in [-1, 1]: random values on integer steps, eased between. */
function noise1D() {
  const v = Array.from({ length: 256 }, () => Math.random() * 2 - 1)
  return (t: number) => {
    const i = Math.floor(t)
    const f = t - i
    const u = f * f * f * (f * (f * 6 - 15) + 10)
    const a = v[i & 255]
    const b = v[(i + 1) & 255]
    return a + (b - a) * u
  }
}

/** Two octaves, stretched a little so the light reaches the edges of its range. */
function track() {
  const lo = noise1D()
  const hi = noise1D()
  return (t: number) => Math.max(-1, Math.min(1, (lo(t) * 0.85 + hi(t * 1.7) * 0.15) * 1.4))
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader')
  return s
}

export function HeroLight() {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = root.current
    const cv = canvas.current
    if (!el || !cv) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gl = cv.getContext('webgl', { premultipliedAlpha: true, antialias: false })
    if (!gl) return

    let prog: WebGLProgram
    try {
      prog = gl.createProgram()!
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link')
    } catch {
      return // the CSS fallback stays
    }
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uScale = gl.getUniformLocation(prog, 'uScale')
    const uLight = gl.getUniformLocation(prog, 'uLight')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    // Up to 1.5 device pixels per CSS pixel: sharp enough for the beads, light on phones.
    let scale = 1
    let w = 0
    let h = 0
    const resize = () => {
      scale = Math.min(window.devicePixelRatio || 1, 1.5)
      w = el.clientWidth
      h = el.clientHeight
      cv.width = Math.round(w * scale)
      cv.height = Math.round(h * scale)
      gl.viewport(0, 0, cv.width, cv.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    el.classList.add('is-gl')

    const nx = track()
    const ny = track()
    // One noise step every ~25s over a modest range: the light barely seems to move.
    const STEP = 25000
    const start = performance.now()
    let raf = 0
    let visible = true
    let lastDraw = 0

    const frame = (now: number) => {
      if (visible) raf = requestAnimationFrame(frame)
      if (now - lastDraw < 15) return // up to 60fps so the rain falls smoothly
      lastDraw = now
      const t = now / STEP
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uScale, cv.width / Math.max(w, 1))
      gl.uniform2f(uLight, w * (0.5 + 0.16 * nx(t)), h * (0.45 + 0.1 * ny(t)))
      // Wrap time (a multiple of the beads' 24s cycle) so float precision never degrades.
      gl.uniform1f(uTime, ((now - start) / 1000) % 2400)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Only draw while the hero is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(frame)
    })
    io.observe(el)

    const lost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      el.classList.remove('is-gl')
    }
    cv.addEventListener('webglcontextlost', lost)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      cv.removeEventListener('webglcontextlost', lost)
      el.classList.remove('is-gl')
    }
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="hero-light">
      <canvas ref={canvas} className="hero-gl" />
    </div>
  )
}
