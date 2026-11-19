// Placeholder wordmark until a designed logo replaces it; only this file changes then.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <h1
        aria-label="Zills"
        className="font-sans font-extrabold tracking-[-0.03em] leading-[0.9] text-fg text-[5.25rem] shards:text-[8.75rem]"
      >
        Z<span className="font-semibold text-fg/55">/</span>LLS
      </h1>
      <p className="mt-3.5 text-muted text-[15px] shards:text-lg">Software, sound &amp; visuals.</p>
    </div>
  )
}
