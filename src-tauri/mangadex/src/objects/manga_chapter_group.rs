use std::collections::HashMap;

use async_graphql::{Context, SelectionField, SimpleObject};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_schema_rust::v5::{ChapterObject, Results};
use mangadex_api_types_rust::{
    error::Result as MDResult, ReferenceExpansionResource, RelationshipType,
};
use uuid::Uuid;

use self::item::MangaChapterItem;

use super::{chapter::Chapter, manga::MangaObject, ExtractReferenceExpansion, ResultsInfo};

pub mod item;

#[derive(Debug, SimpleObject, Clone)]
pub struct MangaChapterGroup {
    pub data: Vec<MangaChapterItem>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl MangaChapterGroup {
    pub fn get_chapter_references_expansions(
        field: SelectionField<'_>,
    ) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "chapters"))
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <Chapter as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        includes
    }
    pub fn get_chapter_references_expansions_from_context(
        ctx: &Context<'_>,
    ) -> Vec<ReferenceExpansionResource> {
        Self::get_chapter_references_expansions(ctx.field())
    }
    pub fn get_manga_references_expansions(
        field: SelectionField<'_>,
    ) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "manga"))
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <MangaObject as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        includes
    }
    pub fn get_manga_references_expansions_from_context(
        ctx: &Context<'_>,
    ) -> Vec<ReferenceExpansionResource> {
        Self::get_manga_references_expansions(ctx.field())
    }
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
        .for_each(|(id, obj)| manga_ids_chapter_group.entry(id).or_default().push(obj));
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
