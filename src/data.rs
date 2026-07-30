use serde::{Deserialize, Serialize};

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
