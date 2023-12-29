use std::ops::{Deref, DerefMut};

use async_graphql::{Context, Error, InputObject, Object, Result};
use mangadex_api_input_types::chapter::list::ChapterListParams;
use mangadex_api_schema_rust::v5::ChapterCollection;
use mangadex_desktop_api2::utils::{
    chapter::{filter::filter, GetAllChapter as OfflineGetAllChapter},
    collection::Collection,
};
use tokio_stream::StreamExt;

use crate::objects::ExtractReferenceExpansionFromContext;
use crate::utils::{get_mangadex_client_from_graphql_context, get_offline_app_state};

#[derive(Debug, InputObject, Clone)]
pub struct GetAllChapterParams {
    pub include_fails: bool,
    pub only_fails: bool,
}

impl Default for GetAllChapterParams {
    fn default() -> Self {
        Self {
            include_fails: true,
            only_fails: false,
        }
    }
}

impl From<GetAllChapterParams> for OfflineGetAllChapter {
    fn from(value: GetAllChapterParams) -> Self {
        Self {
            include_fails: value.include_fails,
            only_fails: value.only_fails,
        }
    }
}

use crate::objects::chapter::lists::ChapterResults;

type Param = ChapterListParams;

#[derive(Debug, Clone)]
pub struct ChapterListQueries(pub Param);

impl Deref for ChapterListQueries {
    type Target = Param;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ChapterListQueries {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Param> for ChapterListQueries {
    fn from(value: Param) -> Self {
        Self(value)
    }
}

impl From<ChapterListQueries> for Param {
    fn from(value: ChapterListQueries) -> Self {
        value.0
    }
}

impl From<&ChapterListQueries> for Param {
    fn from(value: &ChapterListQueries) -> Self {
        value.0.clone()
    }
}

#[Object]
impl ChapterListQueries {
    pub async fn get_offline(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: GetAllChapterParams,
    ) -> Result<ChapterResults> {
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::new("Offline AppState is not loaded"))?;
        let chapter_utils = app_state.chapter_utils();
        let stream = Box::pin(
            chapter_utils.get_chapters_by_stream_id(Box::pin(
                chapter_utils
                    .get_all_chapter(Some(params.into()), app_state)
                    .await?,
            )),
        );
        let res: ChapterCollection = Collection::from_async_stream(
            stream.filter(|item| filter(item, self)),
            self.limit.unwrap_or(10) as usize,
            self.offset.unwrap_or_default() as usize,
        )
        .await?
        .try_into()?;
        Ok(res.into())
    }
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<ChapterResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut params = self.deref().clone();
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn default(
        &self,
        ctx: &Context<'_>,
        offline_params: Option<GetAllChapterParams>,
    ) -> Result<ChapterResults> {
        if let Some(params) = offline_params {
            self.get_offline(ctx, params).await
        } else if let Ok(res) = self.get_online(ctx).await {
            Ok(res)
        } else {
            self.get_offline(ctx, Default::default()).await
        }
    }
}
