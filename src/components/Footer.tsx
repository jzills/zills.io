import { ABOUT_URL } from '@/data/panels'

// Every zills site's footer: the Z/LLS mark beside a link elsewhere in the family
// (on the hub, the resume, shown as "Me" for clients rather than by its domain).
export function Footer() {
  return (
    <footer className="relative z-20 px-6 py-6 font-mono text-[11px] text-muted shards:absolute shards:inset-x-0 shards:bottom-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <a href="https://zills.io/" className="font-sans text-sm font-extrabold tracking-[-0.03em] text-fg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Z<span className="font-semibold text-fg/55">/</span>LLS
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-border" />
          <a href={ABOUT_URL} title="j.zills.io" className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Me <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
