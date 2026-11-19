import { describe, expect, it } from 'vitest'
import html from '../index.html?raw'
import cname from '../public/CNAME?raw'

const publicFiles = Object.keys(import.meta.glob('../public/*', { query: '?url' })).map((p) => p.replace('../public/', ''))

describe('page head', () => {
  it('has the title, description and canonical URL', () => {
    expect(html).toContain('<title>Z/LLS — Software, Audio &amp; Visual Lab</title>')
    expect(html).toMatch(/<meta name="description" content="[^"]+"/)
    expect(html).toContain('<link rel="canonical" href="https://zills.io/" />')
  })

  it('has link preview tags pointing at the OG image', () => {
    expect(html).toContain('<meta property="og:image" content="https://zills.io/og-image.png" />')
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />')
  })

  it('ships the favicon, OG image and custom domain', () => {
    expect(publicFiles).toEqual(expect.arrayContaining(['favicon.svg', 'og-image.png', 'CNAME']))
    expect(cname.trim()).toBe('zills.io')
  })
})
