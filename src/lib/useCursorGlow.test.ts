import { describe, expect, it } from 'vitest'
import { trackCursor } from './useCursorGlow'

describe('trackCursor', () => {
  it('sets --gx and --gy to the pointer position relative to the element', () => {
    const props: Record<string, string> = {}
    const el = {
      getBoundingClientRect: () => ({ left: 100, top: 50 }),
      style: { setProperty: (k: string, v: string) => (props[k] = v) },
    }
    trackCursor({ currentTarget: el, clientX: 340, clientY: 170 } as never)
    expect(props).toEqual({ '--gx': '240px', '--gy': '120px' })
  })
})
