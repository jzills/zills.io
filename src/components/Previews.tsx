import type { ReactNode } from 'react'

// The windows each band shows its site through.

export function LabPreview() {
  return <img src="/previews/lab.webp" alt="Electric Railway to Nowhere-Ville, a shader from the Lab" loading="lazy" className="h-full w-full object-cover" />
}

// Two full rows of four.
const covers = ['meltman', 'halflife', 'static-bloom', 'untitled-04', 'grey-water', 'night-shift', 'low-orbit', 'field-notes']

export function AudioPreview() {
  return (
    <div className="grid h-full grid-cols-4 grid-rows-2 gap-[3px] overflow-hidden">
      {covers.map((c) => (
        <img key={c} src={`/previews/covers/${c}.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
      ))}
    </div>
  )
}

// Syntax colours in the family palette.
const k = (cls: string) => (t: ReactNode) => <span className={cls}>{t}</span>
const fn = k('text-[#22d3ee]')
const ty = k('text-[#67e8f9]')
const st = k('text-[#86efac]')
const nu = k('text-[#fbbf24]')
const op = k('text-zinc-400')

// hmac-manager's registration example, with a greeting for a policy and a key that
// decodes (base64) to "z.//s made this."
const lines: ReactNode[] = [
  <>builder.{ty('Services')}</>,
  <>  {fn('.AddAuthentication')}()</>,
  <>  {fn('.AddHmac')}(options {op('=>')}</>,
  <>  {'{'}</>,
  <>    options.{fn('AddPolicy')}({st('"Hello"')}, policy {op('=>')}</>,
  <>    {'{'}</>,
  <>      policy.{fn('UsePublicKey')}(</>,
  <>        {ty('Guid')}.{fn('Parse')}({st('"e600c4c7-3dc3-434b-8eb2-7a81a7df838a"')}));</>,
  <>      policy.{fn('UsePrivateKey')}({st('"ei4vL3MgbWFkZSB0aGlzLg=="')});</>,
  <>      policy.{fn('UseMemoryCache')}(maxAgeInSeconds: {nu('300')});</>,
  <>    {'});'}</>,
  <>  {'});'}</>,
]

export function CodePreview() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-[#0c0c0e] font-mono text-[10px] leading-[1.8] sm:text-[12px] wide:text-[clamp(10.5px,1.15vw,12px)]">
      <div className="flex items-center gap-3 border-b border-[#1f1f23] bg-surface px-3 py-2 text-[11px]">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="block h-2 w-2 rounded-full bg-border" />
          <i className="block h-2 w-2 rounded-full bg-border" />
          <i className="block h-2 w-2 rounded-full bg-border" />
        </span>
        <span className="border-b border-[#22d3ee] pb-0.5 text-fg">Program.cs</span>
        <span className="ml-auto text-zinc-600">jzills/hmac-manager</span>
      </div>
      {/* Scrolls sideways inside itself on narrow screens; the page never does. */}
      <pre className="code-scroll flex-1 overflow-x-auto py-3 pl-4 text-zinc-300 sm:pl-0">
        {/* Padding on the code, not the scroller, so it survives scrolling to the end. */}
        <code className="inline-block min-w-full pr-6">
          {lines.map((l, i) => (
            <span key={i} className="flex">
              <span aria-hidden="true" className="hidden w-9 shrink-0 pr-3.5 text-right text-zinc-700 select-none sm:inline">
                {i + 1}
              </span>
              <span className="whitespace-pre">{l}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

// The drawn plugin faceplate from plugins.zills.io: a display and four labelled knobs.
const bars = Array.from({ length: 32 }, (_, i) => 18 + 70 * Math.abs(Math.sin(i / 3.2 + 1.3)) * (0.6 + 0.4 * Math.abs(Math.cos(i * 1.7))))
const knobs: [string, number][] = [['Size', -60], ['Spray', -100], ['Pitch', 20], ['Mix', 95]]

export function PluginsPreview() {
  return (
    <div className="grid h-full place-items-center bg-[#141012] p-6">
      <div className="faceplate w-full max-w-[460px] rounded-[10px] border border-border p-5">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase">
          <span className="font-semibold text-zinc-300">Smear</span>
          <span className="text-[#fb923c]">Z/LLS</span>
        </div>
        <div aria-hidden="true" className="mt-3 flex h-[76px] items-end gap-[3px] overflow-hidden rounded-md border border-[#1f1f23] bg-[#0a0a0b] p-2.5">
          {bars.map((h, i) => (
            <span key={i} className="flex-1 rounded-[1px] bg-gradient-to-t from-[#fb923c]/25 to-[#fb923c]/90" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {knobs.map(([name, a]) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <span aria-hidden="true" className="knob" style={{ '--a': `${a}deg` } as React.CSSProperties} />
              <span className="font-mono text-[9px] tracking-[0.12em] text-zinc-500 uppercase">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
