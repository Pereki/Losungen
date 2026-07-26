import type { Devotion } from './models'

const BASE_URL = '/api'

export async function getDevotionOfTheDay (): Promise<Devotion> {
  const response = await fetch(`${BASE_URL}/devotion/today`)
  if (!response.ok) {
    throw new Error(`Failed to fetch today's devotion: ${response.status}`)
  }
  return response.json()
}

export async function getDevotionOf (date: string): Promise<Devotion> {
  const response = await fetch(`${BASE_URL}/devotion/${date}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch devotion: ${response.status}`)
  }
  return response.json()
}
