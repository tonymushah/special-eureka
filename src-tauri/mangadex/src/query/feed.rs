use async_graphql::{Context, Object, Result};
use convert_case::{Case, Casing};
use mangadex_api_input_types::{
    feed::{
        custom_list_feed::CustomListMangaFeedParams, followed_manga_feed::FollowedMangaFeedParams,
    },
    manga::list::MangaListParams,
};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::{
    objects::{
        chapter::lists::ChapterResults,
        manga_chapter_group::{group_results, MangaChapterGroup},
    },
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct FeedQueries;

#[Object]
impl FeedQueries {
    pub async fn user_logged_manga_feed(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: FollowedMangaFeedParams,
    ) -> Result<ChapterResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes = &mut params.includes;
        includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set()
                .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                    "manga" => {
                        includes.push(ReferenceExpansionResource::Manga);
                    }
                    "scanlation_groups" => {
                        includes.push(ReferenceExpansionResource::ScanlationGroup);
                    }
                    "user" => {
                        includes.push(ReferenceExpansionResource::User);
                    }
                    _ => {}
                });
        }
        includes.dedup();
        Ok(params.send(&client).await?.into())
    }
    pub async fn user_logged_manga_feed_grouped(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut feed_params: FollowedMangaFeedParams,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        feed_params.includes = {
            let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
            if let Some(rel) = ctx
                .field()
                .selection_set()
                .find(|f| f.name() == "data")
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "chapters"))
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
            {
                rel.selection_set()
                    .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                        "manga" => {
                            includes.push(ReferenceExpansionResource::Manga);
                        }
                        "scanlation_groups" => {
                            includes.push(ReferenceExpansionResource::ScanlationGroup);
                        }
                        "user" => {
                            includes.push(ReferenceExpansionResource::User);
                        }
                        _ => {}
                    });
            }
            includes.dedup();
            includes
        };
        manga_list_params.includes = {
            let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
            if let Some(rel) = ctx
                .field()
                .selection_set()
                .find(|f| f.name() == "data")
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "manga"))
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
            {
                rel.selection_set()
                    .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                        "manga" => {
                            includes.push(ReferenceExpansionResource::Manga);
                        }
                        "cover_art" => {
                            includes.push(ReferenceExpansionResource::CoverArt);
                        }
                        "authors" => {
                            includes.push(ReferenceExpansionResource::Author);
                        }
                        "artists" => {
                            includes.push(ReferenceExpansionResource::Artist);
                        }
                        "author_artists" => {
                            includes.push(ReferenceExpansionResource::Author);
                            includes.push(ReferenceExpansionResource::Artist);
                        }
                        "creator" => {
                            includes.push(ReferenceExpansionResource::Creator);
                        }
                        _ => {}
                    });
            }
            includes.dedup();
            includes
        };
        Ok(group_results(feed_params.send(&client).await?, &client, manga_list_params).await?)
    }
    pub async fn custom_list_feed(
        &self,
        ctx: &Context<'_>,
        mut params: CustomListMangaFeedParams,
    ) -> Result<ChapterResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes = &mut params.includes;
        includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set()
                .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                    "manga" => {
                        includes.push(ReferenceExpansionResource::Manga);
                    }
                    "scanlation_groups" => {
                        includes.push(ReferenceExpansionResource::ScanlationGroup);
                    }
                    "user" => {
                        includes.push(ReferenceExpansionResource::User);
                    }
                    _ => {}
                });
        }
        includes.dedup();
        Ok(params.send(&client).await?.into())
    }
    pub async fn custom_list_feed_grouped(
        &self,
        ctx: &Context<'_>,
        mut feed_params: CustomListMangaFeedParams,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        feed_params.includes = {
            let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
            if let Some(rel) = ctx
                .field()
                .selection_set()
                .find(|f| f.name() == "data")
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "chapters"))
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
            {
                rel.selection_set()
                    .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                        "manga" => {
                            includes.push(ReferenceExpansionResource::Manga);
                        }
                        "scanlation_groups" => {
                            includes.push(ReferenceExpansionResource::ScanlationGroup);
                        }
                        "user" => {
                            includes.push(ReferenceExpansionResource::User);
                        }
                        _ => {}
                    });
            }
            includes.dedup();
            includes
        };
        manga_list_params.includes = {
            let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
            if let Some(rel) = ctx
                .field()
                .selection_set()
                .find(|f| f.name() == "data")
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "manga"))
                .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
            {
                rel.selection_set()
                    .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                        "manga" => {
                            includes.push(ReferenceExpansionResource::Manga);
                        }
                        "cover_art" => {
                            includes.push(ReferenceExpansionResource::CoverArt);
                        }
                        "authors" => {
                            includes.push(ReferenceExpansionResource::Author);
                        }
                        "artists" => {
                            includes.push(ReferenceExpansionResource::Artist);
                        }
                        "author_artists" => {
                            includes.push(ReferenceExpansionResource::Author);
                            includes.push(ReferenceExpansionResource::Artist);
                        }
                        "creator" => {
                            includes.push(ReferenceExpansionResource::Creator);
                        }
                        _ => {}
                    });
            }
            includes.dedup();
            includes
        };
        Ok(group_results(feed_params.send(&client).await?, &client, manga_list_params).await?)
    }
}
