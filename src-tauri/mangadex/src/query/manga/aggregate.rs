use std::ops::Deref;

use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::manga::aggregate::MangaAggregateParam;
use uuid::Uuid;

use crate::{
    objects::manga::aggregate::MangaAggregate,
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

#[derive(Debug, Clone)]
pub struct MangaAggregateQueries(pub MangaAggregateParam);

impl Deref for MangaAggregateQueries {
    type Target = MangaAggregateParam;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Uuid> for MangaAggregateQueries {
    fn from(value: Uuid) -> Self {
        Self(MangaAggregateParam {
            manga_id: value,
            translated_language: Vec::new(),
            groups: Vec::new(),
        })
    }
}

impl From<MangaAggregateQueries> for MangaAggregateParam {
    fn from(value: MangaAggregateQueries) -> Self {
        value.0
    }
}

impl From<&MangaAggregateQueries> for MangaAggregateParam {
    fn from(value: &MangaAggregateQueries) -> Self {
        value.0.clone()
    }
}

impl From<MangaAggregateParam> for MangaAggregateQueries {
    fn from(value: MangaAggregateParam) -> Self {
        Self(value)
    }
}

impl From<MangaAggregateQueries> for Uuid {
    fn from(value: MangaAggregateQueries) -> Self {
        value.0.manga_id
    }
}

#[Object]
impl MangaAggregateQueries {
    pub async fn chunked(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] is_reversed: bool,
        #[graphql(validator(minimum = 1))] chunk_size: u32,
    ) -> Result<Vec<MangaAggregate>> {
        Ok(self.default(ctx, is_reversed).await?.chunks(chunk_size))
    }
    #[graphql(skip)]
    pub async fn aggregate_offline(
        &self,
        ctx: &Context<'_>,
        is_reversed: bool,
    ) -> Result<MangaAggregate> {
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let mut res: MangaAggregate = app_state
            .manga_utils()
            .with_id(self.manga_id)
            .aggregate_manga_chapter(
                MangaAggregateParams {
                    translated_language: self.translated_language.clone(),
                    groups: self.groups.clone(),
                    ..Default::default()
                },
                app_state.deref(),
            )
            .await?
            .into();
        if is_reversed {
            res.reverse()
        }
        Ok(res)
    }
    #[graphql(skip)]
    pub async fn aggregate_online(
        &self,
        ctx: &Context<'_>,
        is_reversed: bool,
    ) -> Result<MangaAggregate> {
        let param: MangaAggregateParam = self.into();
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut res: MangaAggregate = param.send(&client).await?.into();
        if is_reversed {
            res.reverse()
        }
        Ok(res)
    }
    pub async fn default(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] is_reversed: bool,
    ) -> Result<MangaAggregate> {
        if let Ok(res) = self.aggregate_online(ctx, is_reversed).await {
            Ok(res)
        } else {
            self.aggregate_offline(ctx, is_reversed).await
        }
    }
}
