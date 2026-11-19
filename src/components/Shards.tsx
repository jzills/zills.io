import type { CSSProperties } from 'react'
import type { Panel } from '@/data/panels'
import { PanelLink } from '@/components/PanelContent'
import { useCursorGlow } from '@/lib/useCursorGlow'

// Desktop: the viewport split into four shards meeting at C. Coordinates are
// percentages of a 1280×800 reference, with C at (650, 395).
const C = '50.78% 49.38%'

const shapes: Record<Panel['id'], { clip: string; place: string; glow: string; fill: string }> = {
  oss: { clip: `0 0, 43.75% 0, ${C}, 0 45%`, place: 'justify-start items-start', glow: '0% 0%', fill: 'var(--color-surface)' },
  audio: { clip: `43.75% 0, 100% 0, 100% 41.25%, ${C}`, place: 'justify-end items-start', glow: '100% 0%', fill: 'var(--color-surface-alt)' },
  plugins: { clip: `0 45%, ${C}, 40.63% 100%, 0 100%`, place: 'justify-start items-end', glow: '0% 100%', fill: 'var(--color-surface-alt)' },
  lab: { clip: `${C}, 100% 41.25%, 100% 100%, 40.63% 100%`, place: 'justify-end items-end', glow: '100% 100%', fill: 'var(--color-surface)' },
}

// Seams: from C out to the points where neighbouring shards meet the edges.
const seams = [
  [560, 0],
  [1280, 330],
  [520, 800],
  [0, 360],
]

// Drawn inside each shard, under its text and the centre fade, so the seams melt into the middle.
function Seams() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1280 800" preserveAspectRatio="none">
      {seams.map(([x, y]) => (
        <line key={`${x},${y}`} x1="650" y1="395" x2={x} y2={y} stroke="var(--color-bg)" strokeWidth="6" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}

export function Shards({ panels }: { panels: Panel[] }) {
  const glow = useCursorGlow()
  return (
    <nav aria-label="Sections" className="relative hidden h-dvh min-h-[600px] overflow-hidden shards:block">
      {panels.map((panel, i) => {
        const s = shapes[panel.id]
        return (
          <PanelLink
            key={panel.id}
            panel={panel}
            className={`shard panel-in absolute inset-0 flex px-[4.7%] py-[12.5%] ${s.place}`}
            onPointerMove={panel.href ? glow.onPointerMove : undefined}
            style={{ '--i': i, '--glow-at': s.glow, clipPath: `polygon(${s.clip})`, background: s.fill } as CSSProperties}
          >
            <span aria-hidden="true" className="shard-glow" />
            <span aria-hidden="true" className="shard-glow shard-glow-hot" />
            <Seams />
            {/* Every shard fills the viewport before clipping, so these line up across all four. */}
            <span aria-hidden="true" className="shard-core absolute inset-0" />
            <span aria-hidden="true" className="shard-cursor" />
          </PanelLink>
        )
      })}
    </nav>
  )
}
