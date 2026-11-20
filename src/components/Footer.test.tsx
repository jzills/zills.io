import { describe, expect, it } from 'vitest'
import favicon from '../../public/favicon.svg?raw'
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
    expect(html.replace(/<[^>]+>/g, '')).toMatch(/^z\/\/sMe ↗$/)
    expect(html).toMatch(/<a[^>]*href="https:\/\/j\.zills\.io\/"[^>]*>Me <span/)
  })
})

describe('Footer mark', () => {
  it('links the Z/LLS mark to zills.io', () => {
    expect(renderToString(<Footer />)).toMatch(/<a[^>]*href="https:\/\/zills\.io\/"[^>]*>z<span[^>]*><\/span><span[^>]*>\/\/<\/span>s<\/a>/)
    expect(renderToString(<Footer />)).toMatch(/<span[^>]*class="[^"]*bg-fg[^"]*"[^>]*><\/span><span[^>]*>\/\/<\/span>/)
  })
})

describe('Footer mark name', () => {
  it('names the hub mark "Z/LLS" for screen readers', () => {
    expect(renderToString(<Footer />)).toMatch(/<a[^>]*aria-label="Z\/LLS"[^>]*>z<span/)
  })
})

describe('favicon', () => {
  // The family favicon: a bold z drawn as a shape (favicons can't load web fonts) and the site's dot.
  it('is the z. symbol with this site\'s dot', () => {
    expect(favicon).toMatch(/<path[^>]*d="[^"]+"/)
    expect(favicon).not.toContain('<text')
    expect(favicon).toMatch(/<circle[^>]*fill="#fafafa"/)
  })
})
