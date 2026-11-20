import { ABOUT_URL } from '@/data/panels'

// Every zills site's footer: the Z/LLS mark beside a link elsewhere in the family
// (on the hub, the resume), with the copyright under them.
export function Footer() {
  return (
    <footer className="relative z-20 px-6 py-4 font-mono text-[11px] text-muted shards:absolute shards:inset-x-0 shards:bottom-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-sm font-extrabold tracking-[-0.03em] text-fg">
            Z<span className="font-semibold text-fg/55">/</span>LLS
          </span>
          <span aria-hidden="true" className="h-3.5 w-px bg-border" />
          <a href={ABOUT_URL} className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            j.zills.io <span aria-hidden="true">↗</span>
          </a>
        </div>
        <span>© {__BUILD_YEAR__} Joshua Zillwood</span>
      </div>
    </footer>
  )
}
