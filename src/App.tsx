import { Logo } from '@/components/Logo'
import { Band } from '@/components/Band'
import { AudioPreview, CodePreview, LabPreview, PluginsPreview } from '@/components/Previews'
import { Footer } from '@/components/Footer'
import { panels } from '@/data/panels'

const previews = { lab: LabPreview, oss: CodePreview, audio: AudioPreview, plugins: PluginsPreview }

export default function App() {
  return (
    <div className="texture relative min-h-dvh">
      <main className="relative">
        {/* No header: the wordmark is the first thing on the page. */}
        <section className="hero-glow flex min-h-[88svh] flex-col items-center justify-center px-5 py-16 text-center">
          <Logo />
          <p className="mt-5 text-lg text-zinc-400 sm:text-xl">Somewhere between the signal and the noise.</p>
          {/* A plain link to the first band: works without JavaScript; smooth unless motion is reduced (index.css). */}
          <a
            href={`#${panels[0].id}`}
            aria-label={`Scroll to ${panels[0].title}`}
            className="group mt-12 inline-flex items-center gap-2 px-3 py-2 font-mono text-[11px] tracking-[0.16em] text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg/60"
          >
            SCROLL <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </section>
        {panels.map((p, i) => {
          const Preview = previews[p.id]
          return (
            <Band key={p.id} panel={p} flip={i % 2 === 1}>
              <Preview />
            </Band>
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
