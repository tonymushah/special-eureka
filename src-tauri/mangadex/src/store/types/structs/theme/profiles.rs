use std::{
    collections::HashMap,
    ops::{Deref, DerefMut},
};

use async_graphql::SimpleObject;
use serde::{Deserialize, Serialize};

use super::MangaDexTheme as Theme;

type ThemeProfileInner = HashMap<String, Theme>;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ThemeProfiles(ThemeProfileInner);

impl Deref for ThemeProfiles {
    type Target = ThemeProfileInner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ThemeProfiles {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl ThemeProfiles {
    pub fn get_entries(&self) -> Vec<ThemeProfileEntry> {
        self.iter()
            .map(|(name, value)| ThemeProfileEntry {
                name: name.clone(),
                value: value.clone(),
            })
            .collect()
    }
}

#[derive(Debug, Clone, SimpleObject)]
pub struct ThemeProfileEntry {
    pub name: String,
    pub value: Theme,
}

impl Default for ThemeProfileEntry {
    fn default() -> Self {
        Self {
            name: "Default".into(),
            value: Default::default(),
        }
    }
}
