import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { TopBar } from './TopBar'

describe('TopBar', () => {
  it('links to the resume as "Me"', () => {
    const html = renderToString(<TopBar />)
    expect(html).toContain('href="https://j.zills.io/"')
    const text = html.replace(/<[^>]+>/g, '')
    expect(text).toMatch(/Me\s*↗/)
    expect(text).not.toContain('About')
  })
})
