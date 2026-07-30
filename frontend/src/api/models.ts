export interface VerseRef {
  book: string
  chapter: number
  verse: string
}

export interface Devotion {
  date: string
  weekday: string
  text: string
  teaching: string
  verse: VerseRef
  teaching_verse: VerseRef
  liturgical_day: string | null
}
