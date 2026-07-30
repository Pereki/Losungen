use std::collections::HashMap;

use chrono::{NaiveDate, Utc};

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

    pub fn get_next_church_day(&self) -> Devotion {
        let today = Utc::now().date_naive();
        let mut devotionals: Vec<_> = self
            .devotionals
            .iter()
            .filter(|x| {
                NaiveDate::parse_from_str(x.0, "%Y-%m-%d")
                    .unwrap()
                    .ge(&today)
            })
            .filter(|x| x.1.liturgical_day.is_some())
            .map(|x| x.1.clone())
            .collect();

        devotionals.sort_by(|a, b| a.date.cmp(&b.date));

        devotionals.first().unwrap().clone()
    }
}
