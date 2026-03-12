use async_graphql::{Context, SelectionField, SimpleObject};
use futures_util::{StreamExt, TryStreamExt};
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_schema_rust::v5::{ChapterObject, Results};
use mangadex_api_types_rust::{ReferenceExpansionResource, RelationshipType};
use uuid::Uuid;

use crate::{
    Result, objects::GetId, query::manga::list::MangaListQueries,
    subscription::utils::OptionFlattenStream, utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

use self::item::MangaChapterItem;

use super::{ExtractReferenceExpansion, ResultsInfo, chapter::Chapter, manga::MangaObject};

pub mod item;

#[derive(Debug, SimpleObject, Clone)]
pub struct MangaChapterGroup {
    pub data: Vec<MangaChapterItem>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
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

#[derive(Debug, Default, Clone)]
pub struct GroupsResultsExtras {
    pub only_unread_titles: bool,
    pub disable_scans_groups_blacklist: bool,
    pub disable_users_blacklist: bool,
    pub disable_author_artists_blacklist: bool,
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub async fn groups_results_with_extras(
    chapter_results: Results<ChapterObject>,
    ctx: &Context<'_>,
    mut manga_list_params: MangaListParams,
    extras: GroupsResultsExtras,
) -> Result<MangaChapterGroup> {
    let info: ResultsInfo = (&chapter_results).into();
    let mut manga_ids_chapter_group: Vec<(Uuid, Vec<ChapterObject>)> = Vec::new();
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
            if let Some(chapters_ids) = manga_ids_chapter_group
                .iter_mut()
                .find(|(i, _)| id == *i)
                .map(|(_, ids)| ids)
            {
                chapters_ids.push(obj)
            } else {
                manga_ids_chapter_group.push((id, vec![obj]));
            }
        });

    manga_list_params.manga_ids = manga_ids_chapter_group.iter().map(|(id, _)| *id).collect();
    #[cfg(debug_assertions)]
    log::debug!("{:#?}", manga_list_params.manga_ids);
    manga_list_params.offset = Some(0_u32);
    manga_list_params.limit = Some(manga_list_params.manga_ids.len().try_into()?);
    let mangas = MangaListQueries::new_with_exclude_feed(
        manga_list_params,
        true,
        ctx.get_app_handle::<tauri::Wry>()?,
    )
    .only_unreads(extras.only_unread_titles)
    .disable_author_artists_blacklist(extras.disable_author_artists_blacklist)
    .list_with_inner_filter(ctx, false)
    .await?;
    let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
    Ok(MangaChapterGroup {
        data: futures_util::stream::iter(manga_ids_chapter_group)
            .map(|(id, obj)| -> Option<MangaChapterItem> {
                Some(MangaChapterItem {
                    manga: mangas.iter().find(|manga| manga.get_id() == id).cloned()?,
                    chapters: obj
                        .into_iter()
                        .map(|chap| -> Chapter { chap.into() })
                        .collect(),
                })
            })
            .option_flatten()
            .then(|mut item| {
                let app_handle = app_handle.clone();
                async move {
                    if !extras.disable_scans_groups_blacklist {
                        item.chapters =
                            crate::blacklist::filters::filter_scanlation_groups_chapters(
                                app_handle.clone(),
                                item.chapters,
                            )
                            .await?;
                    }
                    if !extras.disable_users_blacklist {
                        item.chapters = crate::blacklist::filters::filter_users_chapters(
                            app_handle.clone(),
                            item.chapters,
                        )
                        .await?;
                    }
                    Ok::<_, crate::Error>(item)
                }
            })
            .try_collect()
            .await?,
        info,
    })
}

pub async fn group_results(
    chapter_results: Results<ChapterObject>,
    ctx: &Context<'_>,
    manga_list_params: MangaListParams,
) -> Result<MangaChapterGroup> {
    groups_results_with_extras(chapter_results, ctx, manga_list_params, Default::default()).await
}
