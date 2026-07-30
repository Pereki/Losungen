import type { Devotion, LiturgicalDay } from './models'

const BASE_URL = '/api'

export async function getDevotionOfTheDay (): Promise<Devotion> {
  const response = await fetch(`${BASE_URL}/devotion/today`)
  if (!response.ok) {
    throw new Error(`Failed to fetch today's devotion: ${response.status}`)
  }
  return response.json()
}

export async function getNextChurchDay (): Promise<Devotion> {
  const response = await fetch(`${BASE_URL}/church-days/next`)
  if (!response.ok) {
    throw new Error(`Failed to fetch church-day devotion: ${response.status}`)
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

export async function getLiturgicalDay (date: string): Promise<LiturgicalDay[]> {
  const response = await fetch(`${BASE_URL}/liturgical-day/${date}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch liturgical day: ${response.status}`)
  }
  return response.json()
}

export async function getAllLiturgicalDays (): Promise<LiturgicalDay[][]> {
  const response = await fetch(`${BASE_URL}/liturgical-days`)
  if (!response.ok) {
    throw new Error(`Failed to fetch all liturgical days: ${response.status}`)
  }
  return response.json()
}
