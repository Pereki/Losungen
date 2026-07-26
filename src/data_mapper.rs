use std::collections::HashMap;

use chrono::Utc;
use chrono::{Datelike, NaiveDate, Weekday};

use crate::data::Devotion;

pub struct DataMapper {
    devotionals: HashMap<String, Devotion>,
}

impl DataMapper {
    pub fn new() -> Self {
        let file: HashMap<String, Devotion> =
            serde_json::from_str(include_str!("data/data.json")).unwrap();
        Self { devotionals: file }
    }

    pub fn get_devotion_of_the_day(&self) -> Devotion {
        let today = Utc::now().date_naive();
        let formatted = today.format("%Y-%m-%d").to_string();
        self.devotionals.get(&formatted).cloned().unwrap()
    }

    pub fn get_devotion_of(&self, date: &str) -> Devotion {
        self.devotionals.get(date).cloned().unwrap()
    }

    pub fn get_next_sunday(&self) -> Devotion {
        let today = chrono::Local::now().date_naive();
        let days_until_sunday = (7 - today.weekday().num_days_from_sunday()) % 7;
        let next_sunday = today + chrono::Duration::days(days_until_sunday as i64);

        let formatted = next_sunday.format("%Y-%m-%d").to_string();
        self.devotionals.get(&formatted).cloned().unwrap()
    }
}
