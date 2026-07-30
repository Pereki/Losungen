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

export interface Lessons {
  old_testament: string
  epistle: string
  gospel: string
}

export interface LiturgicalDay {
  summary: string
  date: string
  sermon_series: string | null
  liturgical_color: string | null
  sermon_text: string | null
  weekly_saying: string | null
  weekly_hymns: string | null
  weekly_psalm: string | null
  daily_saying: string | null
  daily_hymns: string | null
  daily_psalm: string | null
  offering: string | null
  counting_day: string | null
  note: string | null
  pericopes: Record<string, string> | null
  lessons: Lessons | null
}
