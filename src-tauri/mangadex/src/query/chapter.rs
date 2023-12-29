pub mod list;

use async_graphql::{Context, Error, Object, Result};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_types_rust::ReferenceExpansionResource;
use mangadex_desktop_api2::utils::ExtractData;
use url::Url;
use uuid::Uuid;

use crate::{
    objects::{
        chapter::{lists::ChapterResults, pages::ChapterPages, Chapter},
        manga_chapter_group::{group_results, MangaChapterGroup},
        ExtractReferenceExpansion,
    },
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

use list::{ChapterListQueries, GetAllChapterParams};

#[derive(Debug, Clone, Copy)]
pub struct ChapterQueries;

#[Object]
impl ChapterQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: ChapterListParams,
        offline_params: Option<GetAllChapterParams>,
    ) -> Result<ChapterResults> {
        ChapterListQueries(params)
            .default(ctx, offline_params)
            .await
    }
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            let mut out = <Chapter as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        Ok(client
            .chapter()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
    #[graphql(skip)]
    pub async fn get_offline(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        // TODO Add offline support
        let off_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read_off_state = off_state.read().await;
        let inner_off_state = read_off_state
            .as_ref()
            .ok_or(Error::new("Offline AppState not found"))?;
        Ok(inner_off_state
            .chapter_utils()
            .with_id(id)
            .get_data()?
            .into())
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        if let Ok(online) = self.get_online(ctx, id).await {
            Ok(online)
        } else {
            self.get_offline(ctx, id).await
        }
    }
    #[graphql(skip)]
    pub async fn pages_online(&self, ctx: &Context<'_>, id: Uuid) -> Result<ChapterPages> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(client
            .at_home()
            .server()
            .id(id)
            .get()
            .send()
            .await?
            .body
            .into())
    }
    #[graphql(skip)]
    pub async fn pages_offline(&self, ctx: &Context<'_>, id: Uuid) -> Result<ChapterPages> {
        let off_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read_off_state = off_state.read().await;
        let inner_off_state = read_off_state
            .as_ref()
            .ok_or(Error::new("Offline AppState not found"))?;
        let chapter_utils = inner_off_state.chapter_utils().with_id(id);
        let data: Vec<Url> = chapter_utils
            .get_data_images()
            .unwrap_or_default()
            .into_iter()
            .flat_map(|i| {
                let i = i.to_str()?;
                Url::parse(format!("mangadex://offline/chapter/{id}/data/{i}").as_str()).ok()
            })
            .collect();
        let data_saver: Vec<Url> = chapter_utils
            .get_data_saver_images()
            .unwrap_or_default()
            .into_iter()
            .flat_map(|i| {
                let i = i.to_str()?;
                Url::parse(format!("mangadex://offline/chapter/{id}/data-saver/{i}").as_str()).ok()
            })
            .collect();
        Ok(ChapterPages { data, data_saver })
    }
    pub async fn pages(&self, ctx: &Context<'_>, id: Uuid) -> Result<ChapterPages> {
        if let Ok(offline) = self.pages_offline(ctx, id).await {
            Ok(offline)
        } else {
            self.pages_online(ctx, id).await
        }
    }
    pub async fn list_with_group_by_manga(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut chapter_list_params: ChapterListParams,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        chapter_list_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        Ok(group_results(
            chapter_list_params.send(&client).await?,
            &client,
            manga_list_params,
        )
        .await?)
    }
}
