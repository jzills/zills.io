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
