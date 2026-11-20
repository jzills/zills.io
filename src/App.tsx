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
          <p className="mt-5 text-lg text-zinc-400 sm:text-xl">Software, audio and visual work by Joshua Zillwood.</p>
          <p aria-hidden="true" className="mt-12 font-mono text-[11px] tracking-[0.16em] text-muted">
            SCROLL ↓
          </p>
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
