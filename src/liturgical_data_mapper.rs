use std::collections::HashMap;

use crate::data::LiturgicalDay;

pub struct LitugicalDayDataMapper {
    liturgicalDays: HashMap<String, Vec<LiturgicalDay>>,
}

impl LitugicalDayDataMapper {
    pub fn new() -> Self {
        let file: HashMap<String, Vec<LiturgicalDay>> =
            serde_json::from_str(include_str!("data/liturgical.json")).unwrap();
        Self {
            liturgicalDays: file,
        }
    }

    pub fn get_litugical_day_of(&self, date: &str) -> Vec<LiturgicalDay> {
        self.liturgicalDays.get(date).cloned().unwrap()
    }

    pub fn get_all_liturgical_days(&self) -> Vec<Vec<LiturgicalDay>> {
        let list: Vec<Vec<LiturgicalDay>> =
            self.liturgicalDays.iter().map(|x| x.1.clone()).collect();
        list
    }
}
