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
  it('credits Z/LLS and links to the resume as "Me"', () => {
    const text = renderToString(<Footer />).replace(/<[^>]+>/g, '')
    expect(text).toContain('© 2026 Z/LLS')
    expect(text).toMatch(/Me\s*↗/)
    expect(text).not.toContain('j.zills.io')
  })
})
