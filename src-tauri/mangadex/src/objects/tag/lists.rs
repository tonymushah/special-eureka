use std::{ops::Deref, vec::IntoIter};

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{Results, TagObject};
use mangadex_api_types_rust::TagGroup;

use crate::objects::ResultsInfo;

use super::Tag;

#[derive(Clone, SimpleObject)]
pub struct TagResults {
    data: Vec<Tag>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl Deref for TagResults {
    type Target = Vec<Tag>;

    fn deref(&self) -> &Self::Target {
        &self.data
    }
}

impl IntoIterator for TagResults {
    type Item = Tag;

    type IntoIter = IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}

impl From<Results<TagObject>> for TagResults {
    fn from(value: Results<TagObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Tag as From<TagObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}

#[derive(Debug, Clone, SimpleObject)]
pub struct TagResultsGrouped {
    pub content: Vec<Tag>,
    pub format: Vec<Tag>,
    pub genre: Vec<Tag>,
    pub theme: Vec<Tag>,
}

impl From<Vec<TagObject>> for TagResultsGrouped {
    fn from(value: Vec<TagObject>) -> Self {
        Self {
            content: value
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Content)
                .map(|e| <Tag as From<TagObject>>::from(e.clone()))
                .collect(),
            format: value
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Format)
                .map(|e| <Tag as From<TagObject>>::from(e.clone()))
                .collect(),
            genre: value
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Genre)
                .map(|e| <Tag as From<TagObject>>::from(e.clone()))
                .collect(),
            theme: value
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Theme)
                .map(|e| <Tag as From<TagObject>>::from(e.clone()))
                .collect(),
        }
    }
}

impl From<TagResults> for TagResultsGrouped {
    fn from(value: TagResults) -> Self {
        Self {
            content: value
                .data
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Content)
                .cloned()
                .collect(),
            format: value
                .data
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Format)
                .cloned()
                .collect(),
            genre: value
                .data
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Genre)
                .cloned()
                .collect(),
            theme: value
                .data
                .iter()
                .filter(|o| o.attributes.group == TagGroup::Theme)
                .cloned()
                .collect(),
        }
    }
}
