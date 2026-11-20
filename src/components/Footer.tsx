import { ABOUT_URL } from '@/data/panels'

// Every zills site's footer: the z.//s mark (its dot in the site's colour) beside a link elsewhere in the family
// (on the hub, the resume, shown as "Me" for clients rather than by its domain).
export function Footer() {
  return (
    <footer className="relative z-20 px-6 py-6 font-mono text-[11px] text-muted shards:absolute shards:inset-x-0 shards:bottom-0">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <a href="https://zills.io/" aria-label="Z/LLS" className="font-sans text-sm font-extrabold tracking-[-0.03em] text-fg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">z<span aria-hidden="true" className="mx-[0.05em] inline-block h-[0.17em] w-[0.17em] rounded-full bg-fg" /><span className="mr-[0.08em] font-bold tracking-[-0.12em] opacity-55">//</span>s</a>
          <span aria-hidden="true" className="h-3.5 w-px bg-border" />
          <a href={ABOUT_URL} title="j.zills.io" className="transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Me <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
