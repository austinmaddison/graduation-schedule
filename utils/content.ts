// Shared types + helpers for the localized graduation page docs
// (content/en/index.yml + content/th/index.yml, one doc per locale).

export interface PlanRow {
  time: string
  activity: string
  location: string
  notes: string
  mapsUrl?: string
}

export interface Plan {
  id: string
  title: string
  date: string
  startsAt: string
  tone: 'success' | 'contrast'
  rows: PlanRow[]
}

export interface Hotel {
  id: string
  name: string
  mapsUrl: string
  coordinates: number[]
  image: string
}

export interface Restaurant {
  id: string
  name: string
  address: string
  mapsUrl: string
  coordinates: number[]
  photoCreditUrl: string
  photos: { src: string, alt: string, caption: string }[]
}

export interface Guest {
  name: string
  role: string
  note?: string
}

export interface PageDoc {
  title: string
  description: string
  seo?: { title: string, description: string }
  plans: Plan[]
  hotels: Hotel[]
  restaurants: { note: string, selected: Restaurant }
  guests: { family: Guest[], friends: Guest[] }
}

// Prefix a public asset path with the deploy baseURL (github-pages subpath safe).
export const assetUrl = (path?: string) => {
  if (!path) return undefined
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}

// Google Maps directions link, only for on-campus (Mahidol) locations.
export const campusMapsUrl = (location: string) => {
  if (!location.includes('Mahidol') && !location.includes('มหิดล')) return undefined
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
}
