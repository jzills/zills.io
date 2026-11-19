import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export const paths = ['/']

export function render(path: string) {
  if (!paths.includes(path)) throw new Error(`entry-server: unknown path ${path}`)
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
