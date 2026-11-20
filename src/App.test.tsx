import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from './App'

describe('App', () => {
  it('has no header: the logo leads, and the footer alone links to the resume', () => {
    const html = renderToString(<App />)
    expect(html).not.toContain('<header')
    expect(html.match(/href="https:\/\/j\.zills\.io\/"/g)).toHaveLength(1)
  })
})
