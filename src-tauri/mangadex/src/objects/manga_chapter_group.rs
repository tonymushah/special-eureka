use std::collections::HashMap;

use async_graphql::SimpleObject;
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_schema_rust::v5::{ChapterObject, Results};
use mangadex_api_types_rust::{error::Result as MDResult, RelationshipType};
use uuid::Uuid;

use self::item::MangaChapterItem;

use super::{chapter::Chapter, ResultsInfo};

pub mod item;

#[derive(Debug, SimpleObject, Clone)]
pub struct MangaChapterGroup {
    pub data: Vec<MangaChapterItem>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

pub async fn group_results(
    chapter_results: Results<ChapterObject>,
    client: &MangaDexClient,
    mut manga_list_params: MangaListParams,
) -> MDResult<MangaChapterGroup> {
    let info: ResultsInfo = (&chapter_results).into();
    let mut manga_ids_chapter_group: HashMap<Uuid, Vec<ChapterObject>> = HashMap::new();
    chapter_results
        .data
        .into_iter()
        .flat_map(|obj| -> Option<(Uuid, ChapterObject)> {
            let id = obj
                .find_first_relationships(RelationshipType::Manga)
                .map(|o| o.id)?;
            Some((id, obj))
        })
        .for_each(|(id, obj)| {
            manga_ids_chapter_group
                .entry(id)
                .or_insert_with(Vec::new)
                .push(obj)
        });
    manga_list_params.manga_ids = manga_ids_chapter_group.keys().cloned().collect();
    let mangas = manga_list_params.send(client).await?.data;
    Ok(MangaChapterGroup {
        data: manga_ids_chapter_group
            .into_iter()
            .flat_map(|(id, obj)| -> Option<MangaChapterItem> {
                Some(MangaChapterItem {
                    manga: mangas.iter().find(|manga| manga.id == id).cloned()?.into(),
                    chapters: obj
                        .into_iter()
                        .map(|chap| -> Chapter { chap.into() })
                        .collect(),
                })
            })
            .collect(),
        info,
    })
}
