import type { PointerEvent } from 'react'

// Writes the pointer's position into --gx/--gy on the hovered element, straight onto
// its style: no React state, so nothing re-renders and hydration is unaffected.
export function trackCursor(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--gx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--gy', `${e.clientY - rect.top}px`)
}

export function useCursorGlow() {
  return { onPointerMove: trackCursor }
}
