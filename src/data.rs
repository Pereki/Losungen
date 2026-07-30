use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Deserialize, Serialize, Clone)]
pub struct VerseRef {
    pub book: String,
    pub chapter: u32,
    pub verse: String,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Devotion {
    pub date: String,
    pub weekday: String,
    pub text: String,
    pub teaching: String,
    pub verse: VerseRef,
    pub teaching_verse: VerseRef,
    pub liturgical_day: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct LiturgicalDay {
    pub summary: String,
    pub date: String,
    pub sermon_series: Option<String>,
    pub liturgical_color: Option<String>,
    pub sermon_text: Option<String>,
    pub weekly_saying: Option<String>,
    pub weekly_hymns: Option<String>,
    pub weekly_psalm: Option<String>,
    pub daily_saying: Option<String>,
    pub daily_hymns: Option<String>,
    pub daily_psalm: Option<String>,
    pub offering: Option<String>,
    pub counting_day: Option<String>,
    pub note: Option<String>,
    pub pericopes: Option<HashMap<String, String>>,
    pub lessons: Option<Lessons>,
}

#[derive(Deserialize, Serialize, Clone)]
pub struct Lessons {
    pub old_testament: String,
    pub epistle: String,
    pub gospel: String,
}
