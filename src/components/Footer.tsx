import { ABOUT_URL } from '@/data/panels'

// Every zills site's footer: the z.//s mark (its dot in the site's colour) beside a link elsewhere in the family
// (on the hub, the resume, shown as "Me" for clients rather than by its domain).
// The z.//s mark and the link beside it are each lifted 1px. Inter's lowercase
// sits about 1.2px below the middle of the mark's line box at 14px, and
// JetBrains Mono's about 0.9px below the middle of the link's 16px line, so
// centered on the divider both read as sitting under it. Whole pixels, not ems:
// every offset in the row is then whole, so the browser rounds it the same way
// on every site. Measured from screenshots of the row, not from the boxes.
export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-6 font-mono text-[11px] text-muted">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
        <div className="flex items-center gap-2.5">
          <a href="https://zills.io/" aria-label="Z/LLS" className="relative top-[-1px] font-sans text-sm font-extrabold tracking-[-0.03em] text-fg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">z<span aria-hidden="true" className="mx-[0.05em] inline-block h-[0.17em] w-[0.17em] rounded-full bg-fg" /><span className="mr-[0.08em] font-bold tracking-[-0.12em] opacity-55">//</span>s</a>
          <span aria-hidden="true" className="h-3.5 w-px bg-border" />
          <a href={ABOUT_URL} title="j.zills.io" className="relative top-[-1px] leading-4 transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Me <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
