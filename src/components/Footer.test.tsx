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
  it('carries the Z/LLS mark with the copyright under it, and links to the resume by its domain', () => {
    const text = renderToString(<Footer />).replace(/<[^>]+>/g, '')
    expect(text).toContain('Z/LLS')
    expect(text).toContain(`© ${new Date().getFullYear()} Joshua Zillwood`)
    expect(text).toMatch(/j\.zills\.io\s*↗/)
    expect(text).not.toMatch(/\bMe\b/)
  })
})
