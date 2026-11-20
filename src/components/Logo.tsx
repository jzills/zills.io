// The Z/LLS wordmark: the brand's first impression, in the hero.
export function Logo() {
  return (
    <h1 aria-label="Z/LLS" className="text-[5.5rem] leading-[0.9] font-extrabold tracking-[-0.045em] text-fg sm:text-[clamp(7rem,15vw,13.5rem)]">
      Z<span className="font-semibold text-fg/55">/</span>LLS
    </h1>
  )
}
