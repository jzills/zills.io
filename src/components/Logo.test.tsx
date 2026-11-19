import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders the Z/LLS placeholder as the page heading', () => {
    const html = renderToString(<Logo />)
    expect(html).toContain('<h1')
    expect(html).toContain('aria-label="Zills"')
    // The slash is its own span, so check the visible text with tags stripped.
    expect(html.replace(/<[^>]+>/g, '')).toContain('Z/LLS')
    expect(html).toContain('Software, Audio &amp; Visual Lab')
  })
})
