import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { PanelLink } from './PanelContent'
import { panels } from '@/data/panels'

const oss = panels.find((p) => p.id === 'oss')!
const audio = panels.find((p) => p.id === 'audio')!

describe('PanelLink', () => {
  it('links when href present', () => {
    const html = renderToString(<PanelLink panel={oss} />)
    expect(html).toContain('<a')
    expect(html).toContain('href="https://github.com/jzills"')
    expect(html).not.toContain('Coming soon')
  })

  it('no link when href absent', () => {
    const html = renderToString(<PanelLink panel={audio} />)
    expect(html).not.toContain('<a')
    expect(html).not.toContain('tabindex')
    expect(html).toContain('Coming soon')
  })

  it("sets the panel's accent for its label and dot", () => {
    expect(renderToString(<PanelLink panel={audio} />)).toContain('--a:#fbbf24')
  })
})
