use std::collections::HashMap;

use async_graphql::{Context, InputObject, Object, SimpleObject};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_types_rust::{MangaDexDateTime, MangaSortOrder, MangaStatus, ReadingStatus};
use uuid::Uuid;

use crate::{
    objects::{ExtractReferenceExpansionFromContext, manga::lists::MangaResults},
    query::manga::list::MangaListQueries,
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

pub struct CurrentUserLibrary {
    statuses: HashMap<Uuid, ReadingStatus>,
}

#[derive(Debug, SimpleObject, Copy, Clone)]
pub struct CurrentUserLibrarySize {
    pub unfiltered: u32,
    pub completed: u32,
    pub dropped: u32,
    pub plan_to_read: u32,
    pub reading: u32,
    pub re_reading: u32,
    pub on_hold: u32,
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
    fn reading_status_len(&self, status: Option<ReadingStatus>) -> u32 {
        self.statuses
            .iter()
            .filter(|(_, status_itm)| {
                status
                    .as_ref()
                    .map(|stt| stt == *status_itm)
                    .unwrap_or(true)
            })
            .count() as u32
    }
    async fn extract_result(
        &self,
        ctx: &Context<'_>,
        status: Option<ReadingStatus>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        let section_param = param.unwrap_or_default();
        let mut param: MangaListParams = section_param.clone().into();
        param.includes = <MangaResults as ExtractReferenceExpansionFromContext<'_>>::exctract(ctx);

        let offset = param.offset.unwrap_or_default();
        let limit = param.limit.unwrap_or_default();

        let all_ids = if let Some(status) = status {
            self.extract_ids(status)
        } else {
            self.statuses.keys().copied().collect()
        };
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
    pub authors: Option<Vec<Uuid>>,
    pub artists: Option<Vec<Uuid>>,
    /// DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`.
    pub created_at_since: Option<MangaDexDateTime>,
    /// DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`.
    pub updated_at_since: Option<MangaDexDateTime>,
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
            artists,
            authors,
            created_at_since,
            updated_at_since,
            ..
        } = value;
        Self {
            offset,
            limit,
            order,
            status: publication_status.unwrap_or_default(),
            year,
            has_available_chapters,
            artists: artists.unwrap_or_default(),
            authors: authors.unwrap_or_default(),
            created_at_since,
            updated_at_since,
            ..Default::default()
        }
    }
}

#[Object]
impl CurrentUserLibrary {
    pub async fn size(&self) -> CurrentUserLibrarySize {
        CurrentUserLibrarySize {
            unfiltered: self.reading_status_len(None),
            completed: self.reading_status_len(Some(ReadingStatus::Completed)),
            dropped: self.reading_status_len(Some(ReadingStatus::Dropped)),
            plan_to_read: self.reading_status_len(Some(ReadingStatus::PlanToRead)),
            reading: self.reading_status_len(Some(ReadingStatus::Reading)),
            re_reading: self.reading_status_len(Some(ReadingStatus::ReReading)),
            on_hold: self.reading_status_len(Some(ReadingStatus::OnHold)),
        }
    }
    pub async fn unfiltered(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, None, param).await
    }
    pub async fn completed(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, Some(ReadingStatus::Completed), param)
            .await
    }
    pub async fn dropped(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, Some(ReadingStatus::Dropped), param)
            .await
    }
    pub async fn on_hold(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, Some(ReadingStatus::OnHold), param)
            .await
    }
    pub async fn plan_to_read(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, Some(ReadingStatus::PlanToRead), param)
            .await
    }
    pub async fn reading(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, Some(ReadingStatus::Reading), param)
            .await
    }
    pub async fn re_reading(
        &self,
        ctx: &Context<'_>,
        param: Option<UserLibrarySectionParam>,
    ) -> crate::Result<MangaResults> {
        self.extract_result(ctx, Some(ReadingStatus::ReReading), param)
            .await
    }
}
