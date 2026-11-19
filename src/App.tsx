import { Logo } from '@/components/Logo'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { Blades } from '@/components/Blades'
import { Shards } from '@/components/Shards'
import { panels } from '@/data/panels'

export default function App() {
  return (
    <main className="texture relative min-h-dvh">
      <TopBar />
      {/* In the flow above the blades on phones; centred over the shards' meeting point on desktop. */}
      <Logo className="relative z-10 px-6 pt-24 pb-9 shards:pointer-events-none shards:absolute shards:top-[49.38%] shards:left-[50.78%] shards:-translate-x-1/2 shards:-translate-y-1/2 shards:p-0 shards:text-center" />
      <Blades panels={panels} />
      <Shards panels={panels} />
      <Footer />
    </main>
  )
}
