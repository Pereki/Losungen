const bookMap: Record<string, string> = {
  '1. Mose': 'genesis',
  '2. Mose': 'exodus',
  '3. Mose': 'leviticus',
  '4. Mose': 'numbers',
  '5. Mose': 'deuteronomy',
  'Josua': 'joshua',
  'Richter': 'judges',
  'Rut': 'ruth',
  '1. Samuel': 'first_samuel',
  '2. Samuel': 'second_samuel',
  '1. Könige': 'first_kings',
  '2. Könige': 'second_kings',
  '1. Chronik': 'first_chronicles',
  '2. Chronik': 'second_chronicles',
  'Esra': 'ezra',
  'Nehemia': 'nehemiah',
  'Esther': 'esther',
  'Hiob': 'job',
  'Psalm': 'psalm',
  'Sprüche': 'proverbs',
  'Prediger': 'ecclesiastes',
  'Hoheslied': 'song_of_solomon',
  'Jesaja': 'isaiah',
  'Jeremia': 'jeremiah',
  'Klagelieder': 'lamentations',
  'Hesekiel': 'ezekiel',
  'Daniel': 'daniel',
  'Hosea': 'hosea',
  'Joel': 'joel',
  'Amos': 'amos',
  'Obadja': 'obadiah',
  'Jona': 'jonah',
  'Micha': 'micah',
  'Nahum': 'nahum',
  'Habakuk': 'habakkuk',
  'Zefanja': 'zephaniah',
  'Haggai': 'haggai',
  'Sacharja': 'zechariah',
  'Maleachi': 'malachi',
  'Matthäus': 'matthew',
  'Markus': 'mark',
  'Lukas': 'luke',
  'Johannes': 'john',
  'Apostelgeschichte': 'acts',
  'Römer': 'romans',
  '1. Korinther': 'first_corinthians',
  '2. Korinther': 'second_corinthians',
  'Galater': 'galatians',
  'Epheser': 'ephesians',
  'Philipper': 'philippians',
  'Kolosser': 'colossians',
  '1. Thessalonicher': 'first_thessalonians',
  '2. Thessalonicher': 'second_thessalonians',
  '1. Timotheus': 'first_timothy',
  '2. Timotheus': 'second_timothy',
  'Titus': 'titus',
  'Philemon': 'philemon',
  'Hebräer': 'hebrews',
  'Jakobus': 'james',
  '1. Petrus': 'first_peter',
  '2. Petrus': 'second_peter',
  '1. Johannes': 'first_john',
  '2. Johannes': 'second_john',
  '3. Johannes': 'third_john',
  'Judas': 'jude',
  'Offenbarung': 'revelation',
  '1. Mo': 'genesis',
  '2. Mo': 'exodus',
  '3. Mo': 'leviticus',
  '4. Mo': 'numbers',
  '5. Mo': 'deuteronomy',
  'Jos': 'joshua',
  'Ri': 'judges',
  '1. Sam': 'first_samuel',
  '2. Sam': 'second_samuel',
  '1. Kön': 'first_kings',
  '2. Kön': 'second_kings',
  '1. Chr': 'first_chronicles',
  '2. Chr': 'second_chronicles',
  'Esr': 'ezra',
  'Neh': 'nehemiah',
  'Ps': 'psalm',
  'Spr': 'proverbs',
  'Pred': 'ecclesiastes',
  'Hld': 'song_of_solomon',
  'Jes': 'isaiah',
  'Jer': 'jeremiah',
  'Klgl': 'lamentations',
  'Hes': 'ezekiel',
  'Dan': 'daniel',
  'Hos': 'hosea',
  'Am': 'amos',
  'Obd': 'obadiah',
  'Jon': 'jonah',
  'Mi': 'micah',
  'Nah': 'nahum',
  'Hab': 'habakkuk',
  'Zef': 'zephaniah',
  'Hag': 'haggai',
  'Sach': 'zechariah',
  'Mal': 'malachi',
  'Mt': 'matthew',
  'Mk': 'mark',
  'Lk': 'luke',
  'Joh': 'john',
  'Apg': 'acts',
  'Röm': 'romans',
  '1. Kor': 'first_corinthians',
  '2. Kor': 'second_corinthians',
  'Gal': 'galatians',
  'Eph': 'ephesians',
  'Phil': 'philippians',
  'Kol': 'colossians',
  '1. Thes': 'first_thessalonians',
  '2. Thes': 'second_thessalonians',
  '1. Tim': 'first_timothy',
  '2. Tim': 'second_timothy',
  'Tit': 'titus',
  'Phim': 'philemon',
  'Hebr': 'hebrews',
  'Jak': 'james',
  '1. Petr': 'first_peter',
  '2. Petr': 'second_peter',
  '1. Joh': 'first_john',
  '2. Joh': 'second_john',
  '3. Joh': 'third_john',
  'Jud': 'jude',
  'Offb': 'revelation',
}

export function translateBook (germanBook: string): string | undefined {
  const normalized = germanBook.trim().replace(/\s+/g, ' ')
  if (bookMap[normalized]) {
    return bookMap[normalized]
  }
  const alt = normalized.replace(/\./g, '. ')
  if (bookMap[alt]) {
    return bookMap[alt]
  }
  return undefined
}

export function getVersesList (verses: string): string[] {
  const splittetVerses = verses.split('-')
  const singleQuotes: string[] = []
  const cleanedVerses: string[] = []

  for (const part of splittetVerses) {
    if (part.includes('.')) {
      const splitet = part.split('.')
      singleQuotes.push(splitet[1])
      cleanedVerses.push(splitet[0])
    } else {
      cleanedVerses.push(part)
    }
  }

  if (cleanedVerses.length === 1) {
    return [...singleQuotes, ...cleanedVerses]
  }

  const tuple: { start: string, end: string }[] = []

  for (let i = 0; i <= cleanedVerses.length; i += 2) {
    tuple.push({ start: cleanedVerses[i], end: cleanedVerses[i + 1] })
  }

  for (const tupleEntry of tuple) {
    for (let j = Number.parseInt(tupleEntry.start); j <= Number.parseInt(tupleEntry.end); j++) {
      cleanedVerses.push(String(j))
    }
  }

  return [...cleanedVerses, ...singleQuotes]
}

export function getBibleLink (book: string, chapter: string | number, verses: string) {
  const engBook = translateBook(book) ?? book
  const versesList = getVersesList(verses)
  const vParam = versesList.length > 0 ? versesList.join(',') : ''
  return `https://www.dasdawidt.com/bible-reader/reader?t=elb&b=${engBook}&c=${chapter}${vParam ? `&v=${vParam}` : ''}`
}

function cleanVerses (v: string): string {
  let s = v.replace(/\([^)]*\)/g, '')
  s = s.replace(/(\d+)[a-z]/gi, '$1')
  s = s.split(/\s+oder\s+/i, 1)[0]
  s = s.split(';', 1)[0]
  s = s.replace(/–/g, '-')
  s = s.trim()
  return s
}

export function parseGermanBibleRef (text: string): { book: string, chapter: number, verses: string } | null {
  const t = text.trim()
  if (!t) {
    return null
  }

  const psalmOnlyChapter = /^(\d+)$/
  const pm1 = t.match(psalmOnlyChapter)
  if (pm1) {
    return { book: 'Psalm', chapter: Number.parseInt(pm1[1]), verses: '' }
  }

  const psalmChapterVerse = /^(\d+)[,.]\s*(\d.*)$/
  const pm2 = t.match(psalmChapterVerse)
  if (pm2) {
    const verses = cleanVerses(pm2[2])
    return { book: 'Psalm', chapter: Number.parseInt(pm2[1]), verses }
  }

  const sortedKeys = Object.keys(bookMap).sort((a: string, b: string) => b.length - a.length) // eslint-disable-line unicorn/no-array-sort
  const escaped = sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`))
  const bookPattern = escaped.join('|')
  const refRegex = new RegExp(String.raw`^(${bookPattern})\s+(\d+)(?:[,.]\s*(\d.*))?$`, 'i')
  const m = t.match(refRegex)
  if (m) {
    const book = m[1].trim()
    const chapter = Number.parseInt(m[2])
    const verses = m[3] ? cleanVerses(m[3]) : ''
    return { book, chapter, verses }
  }

  return null
}
