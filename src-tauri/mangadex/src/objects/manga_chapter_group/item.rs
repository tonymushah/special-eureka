use async_graphql::SimpleObject;

use crate::objects::{chapter::Chapter, manga::MangaObject};

#[derive(Debug, Clone, SimpleObject)]
pub struct MangaChapterItem {
    pub manga: MangaObject,
    pub chapters: Vec<Chapter>,
}
