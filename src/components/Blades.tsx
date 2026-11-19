import type { CSSProperties } from 'react'
import type { Panel } from '@/data/panels'
import { PanelLink } from '@/components/PanelContent'

// Phones: a 2×2 grid of slanted cards under the logo.
export function Blades({ panels }: { panels: Panel[] }) {
  return (
    <nav aria-label="Sections" className="grid grid-cols-2 gap-2.5 px-5 pb-10 shards:hidden">
      {panels.map((panel, i) => (
        <PanelLink key={panel.id} panel={panel} className="blade panel-in relative block" style={{ '--i': i } as CSSProperties}>
          <span aria-hidden="true" className="blade-wash" />
        </PanelLink>
      ))}
    </nav>
  )
}
