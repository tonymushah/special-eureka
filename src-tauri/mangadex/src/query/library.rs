use std::collections::HashMap;

use async_graphql::{Context, InputObject, Object};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_types_rust::{MangaSortOrder, MangaStatus, ReadingStatus};
use uuid::Uuid;

use crate::{
    objects::manga::lists::MangaResults, query::manga::list::MangaListQueries,
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

pub struct CurrentUserLibrary {
    statuses: HashMap<Uuid, ReadingStatus>,
}

impl CurrentUserLibrary {
    pub async fn new(client: &MangaDexClient) -> crate::Result<Self> {
        let res = client.manga().status().get().send().await?;
        let statuses = res.statuses;
        Ok(Self { statuses })
    }
    fn extract_ids(&self, status: ReadingStatus) -> Vec<Uuid> {
        self.statuses
            .iter()
            .filter(|(_, stt)| **stt == status)
            .map(|(id, _)| *id)
            .collect()
    }
    async fn extract_result(
        &self,
        ctx: &Context<'_>,
        status: ReadingStatus,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        let section_param = param.unwrap_or_default();
        let mut param: MangaListParams = section_param.clone().into();

        let offset = param.offset.unwrap_or_default();
        let limit = param.limit.unwrap_or_default();

        let all_ids = self.extract_ids(status);
        let total: u32 = all_ids.len().try_into()?;

        if total == 0 {
            return Ok(MangaResults::default());
        }

        param.manga_ids = all_ids
            .iter()
            .skip(offset.try_into()?)
            .take(limit.try_into()?)
            .copied()
            .collect();

        let mut results = if param.manga_ids.is_empty() {
            MangaResults::default()
        } else {
            MangaListQueries::new_with_exclude_feed(
                param,
                section_param.exclude_content_profile.unwrap_or_default(),
                ctx.get_app_handle::<tauri::Wry>()?,
            )
            .list(ctx)
            .await?
        };
        results.info.limit = limit;
        results.info.offset = offset;
        results.info.total = total;

        Ok(results)
    }
}

#[derive(Debug, Clone, InputObject, Default)]
pub struct UserLibrarySectionParam {
    pub offset: Option<u32>,
    pub limit: Option<u32>,
    pub order: Option<MangaSortOrder>,
    pub publication_status: Option<Vec<MangaStatus>>,
    pub year: Option<u16>,
    pub has_available_chapters: Option<bool>,
    pub exclude_content_profile: Option<bool>,
}

impl From<UserLibrarySectionParam> for MangaListParams {
    fn from(value: UserLibrarySectionParam) -> Self {
        let UserLibrarySectionParam {
            offset,
            limit,
            order,
            publication_status,
            year,
            has_available_chapters,
            ..
        } = value;
        Self {
            offset,
            limit,
            order,
            status: publication_status.unwrap_or_default(),
            year,
            has_available_chapters,
            ..Default::default()
        }
    }
}

#[Object]
impl CurrentUserLibrary {
    pub async fn completed(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, ReadingStatus::Completed, param)
            .await
    }
    pub async fn dropped(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, ReadingStatus::Dropped, param)
            .await
    }
    pub async fn on_hold(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, ReadingStatus::OnHold, param).await
    }
    pub async fn plan_to_read(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, ReadingStatus::PlanToRead, param)
            .await
    }
    pub async fn reading(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, ReadingStatus::Reading, param)
            .await
    }
    pub async fn re_reading(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, ReadingStatus::ReReading, param)
            .await
    }
}
