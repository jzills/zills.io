import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import type { Panel } from '@/data/panels'

type Props = {
  panel: Panel
  // Shape and position, from the layout (blades or shards).
  className?: string
  style?: CSSProperties
  // The layout's decoration (fills, glows, edges), drawn behind the text. Decorations
  // light up with `group-hover:` and `group-focus-visible:`, so keyboard focus shows
  // exactly what hover does: the panels are clipped shapes, which would clip an outline.
  children?: ReactNode
  onPointerMove?: (e: PointerEvent<HTMLElement>) => void
}

// One section of zills.io. A panel with an href is a link; one without is a plain,
// unfocusable block marked "Coming soon".
export function PanelLink({ panel, className = '', style, children, onPointerMove }: Props) {
  const live = panel.href !== undefined
  const cls = `group isolate outline-none ${className}`
  const vars = { '--a': panel.accent, ...style } as CSSProperties

  const content = (
    <>
      {children}
      <span className="panel-text relative block">
        <span className="block font-mono text-[11px] tracking-[0.12em] text-(--a)">{panel.label}</span>
        <span className="panel-title mt-1.5 block text-[22px] font-bold tracking-tight text-fg shards:text-[26px]">
          <span className="decoration-(--a) decoration-2 underline-offset-4 group-focus-visible:underline">
            {panel.title}
          </span>
          <span className="text-(--a)">.</span>
        </span>
        <span className="mt-1 block text-[13px] text-muted">
          {panel.description}
          {live && (
            <>
              {' '}
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                →
              </span>
            </>
          )}
        </span>
        {!live && (
          <span className="mt-2 inline-block rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase">
            Coming soon
          </span>
        )}
      </span>
    </>
  )

  return live ? (
    <a href={panel.href} target="_self" className={cls} style={vars} onPointerMove={onPointerMove}>
      {content}
    </a>
  ) : (
    <div className={cls} style={vars}>
      {content}
    </div>
  )
}
