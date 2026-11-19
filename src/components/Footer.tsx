import { ABOUT_URL } from '@/data/panels'

export function Footer() {
  return (
    <footer className="relative z-20 flex justify-between px-6 py-4 font-mono text-[11px] text-muted shards:absolute shards:inset-x-0 shards:bottom-0">
      <span>© 2026 Zills</span>
      <a href={ABOUT_URL} className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        j.zills.io <span aria-hidden="true">↗</span>
      </a>
    </footer>
  )
}
