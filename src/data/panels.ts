// The sites zills.io shows, in the order the page shows them: the live, most visual
// first. A section without an href isn't public yet and shows "Coming soon"; give it
// one (and a cta) when its site launches.
export type Panel = {
  id: 'lab' | 'oss' | 'audio' | 'plugins'
  number: string
  title: string
  blurb: string
  // The site's accent in the zills brand family.
  accent: string
  href?: string
  cta?: string
}

export const ABOUT_URL = 'https://j.zills.io/'

export const panels: Panel[] = [
  {
    id: 'lab',
    number: '01',
    title: 'Lab',
    blurb: 'Shaders, generative video and images, most of them running live in your browser.',
    accent: '#a78bfa',
    href: 'https://lab.zills.io/',
    cta: 'Enter the Lab →',
  },
  {
    id: 'oss',
    number: '02',
    title: 'Open Source',
    blurb: 'Libraries and tools for .NET, Go, Kubernetes and AI agents. Shown: request signing for ASP.NET Core with hmac-manager.',
    accent: '#22d3ee',
    href: 'https://oss.zills.io/',
    cta: 'Browse the projects →',
  },
  {
    id: 'audio',
    number: '03',
    title: 'Audio',
    blurb: 'Releases, sketches and experiments from Desmata, Zills, Co2 and th!rsty.',
    accent: '#fbbf24',
  },
  {
    id: 'plugins',
    number: '04',
    title: 'Plugins',
    blurb: 'Audio plugins and instruments, in development.',
    accent: '#fb923c',
  },
]
