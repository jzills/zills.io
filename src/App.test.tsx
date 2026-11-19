import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from './App'

const html = renderToString(<App />)

describe('App', () => {
  it('about link', () => {
    expect(html).toContain('href="https://j.zills.io/"')
  })

  it('all panels', () => {
    for (const title of ['Open Source', 'Audio', 'Plugins', 'Lab']) expect(html).toContain(title)
  })

  it('order', () => {
    const at = (s: string) => html.indexOf(s)
    expect(at('Open Source')).toBeLessThan(at('>Audio<'))
    expect(at('>Audio<')).toBeLessThan(at('>Plugins<'))
    expect(at('>Plugins<')).toBeLessThan(at('>Lab<'))
  })

  it('visible without js', () => {
    expect(html).not.toMatch(/opacity:\s*0|visibility:\s*hidden/)
  })

  it('footer', () => {
    expect(html).toContain('© 2026 Z/LLS')
  })
})
