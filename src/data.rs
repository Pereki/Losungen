use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone)]
pub struct Devotion {
    pub date: String,
    pub weekday: String,
    pub text: String,
    pub teaching: String,
    pub verse: String,
    pub teaching_verse: String,
    pub liturgical_day: Option<String>,
}

impl Devotion {
    pub fn new(
        date: String,
        weekday: String,
        text: String,
        teaching: String,
        verse: String,
        teaching_verse: String,
        liturgical_day: Option<String>,
    ) -> Self {
        Self {
            date,
            weekday,
            text,
            teaching,
            verse,
            teaching_verse,
            liturgical_day,
        }
    }
}
