// The four sections zills.io points to. A panel without an href isn't live yet
// and shows "Coming soon"; give it one when its site launches.
export type Panel = {
  id: 'oss' | 'audio' | 'plugins' | 'lab'
  label: string
  title: string
  description: string
  // The site's accent in the zills brand family.
  accent: string
  href?: string
}

export const ABOUT_URL = 'https://j.zills.io/'

export const panels: Panel[] = [
  {
    id: 'oss',
    label: '01 · OSS',
    title: 'Open Source',
    description: 'Libraries & tools for .NET, Go, Kubernetes',
    accent: '#22d3ee',
    // Until oss.zills.io exists.
    href: 'https://github.com/jzills',
  },
  { id: 'audio', label: '02 · AUDIO', title: 'Audio', description: 'Sound design & music', accent: '#fbbf24' },
  { id: 'plugins', label: '03 · PLUGINS', title: 'Plugins', description: 'Audio plugins & instruments', accent: '#fb923c' },
  {
    id: 'lab',
    label: '04 · LAB',
    title: 'Lab',
    description: 'Shaders, visuals & experiments',
    accent: '#a78bfa',
    // Until lab.zills.io exists.
    href: 'https://j.zills.io/lab/',
  },
]
