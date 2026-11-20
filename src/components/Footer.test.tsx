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
  // The hub's one exception to "mark | domain": its link is the person behind it, not the hub.
  it('is just the mark and a "Me" link to the resume', () => {
    const html = renderToString(<Footer />)
    expect(html.replace(/<[^>]+>/g, '')).toMatch(/^Z\/LLSMe ↗$/)
    expect(html).toMatch(/<a[^>]*href="https:\/\/j\.zills\.io\/"[^>]*>Me <span/)
  })
})

describe('Footer mark', () => {
  it('links the Z/LLS mark to zills.io', () => {
    expect(renderToString(<Footer />)).toMatch(/<a[^>]*href="https:\/\/zills\.io\/"[^>]*>Z<span[^>]*>\/<\/span>LLS<\/a>/)
  })
})
