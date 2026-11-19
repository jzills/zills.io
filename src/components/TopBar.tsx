import { ABOUT_URL } from '@/data/panels'

export function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 font-mono text-[13px] text-muted">
      <span>zills.io</span>
      <a
        href={ABOUT_URL}
        className="rounded-full border border-border px-3 py-1.5 text-fg transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        J · About <span aria-hidden="true">↗</span>
      </a>
    </header>
  )
}
