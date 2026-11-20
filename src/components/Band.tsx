import type { CSSProperties, ReactNode } from 'react'
import type { Panel } from '@/data/panels'

// One site: its preview window (cut corner) and what it is. Sides alternate on wide
// screens, and the preview always gets the wider column; on phones it comes first.
export function Band({ panel, flip, children }: { panel: Panel; flip: boolean; children: ReactNode }) {
  return (
    <section data-band={panel.id} aria-labelledby={`band-${panel.id}`} className="rise border-t border-border" style={{ '--a': panel.accent } as CSSProperties}>
      <div className={`mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-14 sm:px-7 wide:gap-16 wide:py-20 ${flip ? 'wide:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]' : 'wide:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'}`}>
        <div className={`cut-corner h-[290px] overflow-hidden sm:h-[340px] ${flip ? 'wide:order-2' : ''}`}>{children}</div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-(--a) uppercase">
            {panel.number} · {panel.title}
          </p>
          <h2 id={`band-${panel.id}`} className="mt-2 text-5xl leading-none font-extrabold tracking-[-0.035em] text-fg sm:text-6xl">
            {panel.title}
            <span className="text-(--a)">.</span>
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-zinc-300">{panel.blurb}</p>
          {panel.href ? (
            <a href={panel.href} className="mt-6 inline-block font-mono text-[13px] text-(--a) transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--a)">
              {panel.cta}
            </a>
          ) : (
            <p className="mt-6 font-mono text-[12px] tracking-[0.12em] text-muted uppercase">Coming soon</p>
          )}
        </div>
      </div>
    </section>
  )
}
