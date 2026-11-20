import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Footer } from './Footer'

describe('Footer', () => {
  it('uses the muted text colour, which meets AA contrast on the background', () => {
    const html = renderToString(<Footer />)
    expect(html).toContain('text-muted')
    expect(html).not.toContain('#5b5b63')
  })
})

describe('Footer text', () => {
  it('is just the mark and the resume link, by its domain, with no copyright line', () => {
    const text = renderToString(<Footer />).replace(/<[^>]+>/g, '')
    expect(text).toMatch(/^Z\/LLSj\.zills\.io ↗$/)
    expect(text).not.toMatch(/\bMe\b/)
  })
})

describe('Footer mark', () => {
  it('links the Z/LLS mark to zills.io', () => {
    expect(renderToString(<Footer />)).toMatch(/<a[^>]*href="https:\/\/zills\.io\/"[^>]*>Z<span[^>]*>\/<\/span>LLS<\/a>/)
  })
})
