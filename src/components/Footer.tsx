import { ABOUT_URL } from '@/data/panels'

// Every zills site's footer: the Z/LLS mark with the copyright under it. The hub's
// right-hand link goes to the resume rather than back to itself.
export function Footer() {
  return (
    <footer className="relative z-20 flex items-center justify-between px-6 py-4 font-mono text-[11px] text-muted shards:absolute shards:inset-x-0 shards:bottom-0">
      <div className="flex flex-col gap-1">
        <span className="font-sans text-sm font-extrabold tracking-[-0.03em] text-fg">
          Z<span className="font-semibold text-fg/55">/</span>LLS
        </span>
        <span>© {__BUILD_YEAR__} Joshua Zillwood</span>
      </div>
      <a href={ABOUT_URL} title="j.zills.io" className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        Me <span aria-hidden="true">↗</span>
      </a>
    </footer>
  )
}
