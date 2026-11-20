import { describe, expect, it } from 'vitest'
import { ABOUT_URL, panels } from './panels'

const byId = (id: string) => panels.find((p) => p.id === id)

describe('panels', () => {
  it('lists the four sections in order', () => {
    expect(panels.map((p) => p.id)).toEqual(['oss', 'audio', 'plugins', 'lab'])
    expect(panels.map((p) => p.label)).toEqual(['01 · OSS', '02 · AUDIO', '03 · PLUGINS', '04 · LAB'])
  })

  it('gives every panel a title and description', () => {
    for (const p of panels) {
      expect(p.title.length).toBeGreaterThan(0)
      expect(p.description.length).toBeGreaterThan(0)
    }
  })

  it("uses each site's accent", () => {
    expect(panels.map((p) => p.accent)).toEqual(['#22d3ee', '#fbbf24', '#fb923c', '#a78bfa'])
  })

  it('links only to absolute https URLs', () => {
    for (const p of panels) if (p.href !== undefined) expect(p.href).toMatch(/^https:\/\//)
  })

  it('links Open Source and Lab, and leaves Audio and Plugins unlinked', () => {
    expect(byId('oss')?.href).toBe('https://oss.zills.io/')
    expect(byId('lab')?.href).toBe('https://lab.zills.io/')
    expect(byId('audio')?.href).toBeUndefined()
    expect(byId('plugins')?.href).toBeUndefined()
  })

  it('points About at the resume site', () => {
    expect(ABOUT_URL).toBe('https://j.zills.io/')
  })
})
