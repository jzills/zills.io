import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from './App'
import { panels } from '@/data/panels'

const html = renderToString(<App />)
const text = html.replace(/<!-- -->/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
const bands = html.match(/<section[^>]*data-band="[^"]+"[\s\S]*?<\/section>/g) ?? []

describe('zills.io', () => {
  it('leads with the Z/LLS wordmark and the line naming Joshua, with no header', () => {
    expect(html).toMatch(/<h1[^>]*>Z<span[^>]*>\/<\/span>LLS<\/h1>/)
    expect(text).toContain('Software, audio and visual work by Joshua Zillwood.')
    expect(html).not.toContain('<header')
  })

  it('shows a band per site, in order, each with its number, name, dot and sentence', () => {
    expect(bands).toHaveLength(panels.length)
    panels.forEach((p, i) => {
      const band = bands[i].replace(/<!-- -->/g, '')
      expect(band).toContain(`data-band="${p.id}"`)
      expect(band).toContain(p.number)
      expect(band).toMatch(new RegExp(`>${p.title}<span[^>]*>\\.</span>`))
      expect(band).toContain(p.blurb.replace(/&/g, '&amp;'))
    })
  })

  it('links the live sites and marks the others "Coming soon", unlinked', () => {
    panels.forEach((p, i) => {
      if (p.href) expect(bands[i]).toMatch(new RegExp(`<a[^>]*href="${p.href}"[^>]*>${p.cta}`))
      else {
        expect(bands[i]).toContain('Coming soon')
        expect(bands[i]).not.toMatch(/<a /)
      }
    })
  })

  it('previews the Lab with a described still', () => {
    expect(bands[0]).toMatch(/<img[^>]*alt="[^"]*Electric Railway[^"]*"/)
  })

  it('shows a real hmac-manager snippet with the Hello policy and the Easter-egg key, and no comments', () => {
    const code = bands[1].replace(/<[^>]+>/g, '')
    expect(code).toContain('Program.cs')
    expect(code).toContain('AddPolicy(&quot;Hello&quot;')
    expect(code).toContain('e600c4c7-3dc3-434b-8eb2-7a81a7df838a')
    expect(code).toContain('ei4vL3MgbWFkZSB0aGlzLg==')
    expect(code).not.toMatch(/\/\/ /)
  })

  it('shows the Audio covers and a Plugins faceplate', () => {
    expect(bands[2].match(/<img/g)!.length).toBeGreaterThanOrEqual(8)
    expect(bands[3]).toContain('faceplate')
  })

  it('has one link to the resume, in the footer', () => {
    expect(html.match(/href="https:\/\/j\.zills\.io\/"/g)).toHaveLength(1)
  })

  it('never hides content in the prerendered HTML', () => {
    expect(html).not.toMatch(/opacity:\s*0/)
  })
})
