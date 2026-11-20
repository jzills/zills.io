import { describe, expect, it } from 'vitest'
import { ABOUT_URL, panels } from './panels'

describe('sections', () => {
  it('shows the live, most visual sites first: Lab, Open Source, Audio, Plugins', () => {
    expect(panels.map((p) => p.id)).toEqual(['lab', 'oss', 'audio', 'plugins'])
    expect(panels.map((p) => p.number)).toEqual(['01', '02', '03', '04'])
  })

  it("uses each site's accent", () => {
    expect(panels.map((p) => p.accent)).toEqual(['#a78bfa', '#22d3ee', '#fbbf24', '#fb923c'])
  })

  it('gives every section a sentence and, when it links, a call to action', () => {
    for (const p of panels) {
      expect(p.blurb.length, p.id).toBeGreaterThan(20)
      if (p.href) expect(p.cta, p.id).toMatch(/→$/)
    }
  })

  it('links only the public sites, over https', () => {
    expect(panels.filter((p) => p.href).map((p) => p.id)).toEqual(['lab', 'oss'])
    for (const p of panels.filter((p) => p.href)) expect(p.href).toMatch(/^https:\/\/[a-z.]+\.zills\.io\/$/)
  })

  it('points Me at the resume site', () => {
    expect(ABOUT_URL).toBe('https://j.zills.io/')
  })
})
