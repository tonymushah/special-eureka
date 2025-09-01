use async_graphql::{Context, Enum, InputObject, Object};
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_types_rust::{MangaDexDateTime, MangaSortOrder, OrderDirection};
use uuid::Uuid;

use crate::{
    objects::{
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
        manga::{MangaObject, lists::MangaResults},
    },
    query::manga::list::MangaListQueries,
    store::types::structs::content::{ContentProfile, Feedable, GetContentProfile},
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Clone, Copy)]
pub struct TagPageQueries(pub Uuid);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Ord, PartialOrd, Hash, Enum, Default)]
pub enum DatePeriod {
    ThisWeek,
    Past2Weeks,
    ThisMonth,
    Past6Months,
    ThisYear,
    #[default]
    AllTime,
}

#[derive(Debug, InputObject, Default)]
pub struct TagPopularList {
    pub offset: Option<u32>,
    pub limit: Option<u32>,
    pub date_period: Option<DatePeriod>,
}

#[Object]
impl TagPageQueries {
    pub async fn top_ten(&self, ctx: &Context<'_>) -> crate::Result<Vec<MangaObject>> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let current_content_profile: ContentProfile = app.get_content_profile()?;
        let mut params = MangaListParams {
            limit: 10.into(),
            offset: 0.into(),
            excluded_tags: current_content_profile
                .excluded_tags
                .iter()
                .filter(|id| **id != self.0)
                .copied()
                .collect(),
            included_tags: vec![self.0],
            order: Some(MangaSortOrder::Relevance(OrderDirection::Descending)),
            created_at_since: {
                let d = MangaDexDateTime::default();
                let d = d.as_ref().saturating_sub(time::Duration::days(30));
                Some(MangaDexDateTime::new(&d))
            },
            includes: {
                ctx.field()
                    .selection_set()
                    .find(|f| f.name() == "relationships")
                    .map(<MangaObject as ExtractReferenceExpansion>::exctract)
                    .unwrap_or_default()
            },
            ..Default::default()
        };
        params = params.feed(&current_content_profile);

        let client = app.get_mangadex_client()?;

        Ok(params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(Into::into)
            .collect())
    }
    pub async fn popular_inf_section(
        &self,
        ctx: &Context<'_>,
        params: Option<TagPopularList>,
    ) -> crate::Result<MangaResults> {
        let params: TagPopularList = params.unwrap_or_default();
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let current_content_profile: ContentProfile = app.get_content_profile()?;
        let params = MangaListParams {
            limit: params.limit,
            offset: params.offset,
            excluded_tags: current_content_profile
                .excluded_tags
                .iter()
                .filter(|id| **id != self.0)
                .copied()
                .collect(),
            included_tags: vec![self.0],
            order: Some(MangaSortOrder::FollowedCount(OrderDirection::Descending)),
            created_at_since: match params.date_period {
                None | Some(DatePeriod::AllTime) => None,
                Some(period) => match period {
                    DatePeriod::ThisWeek => {
                        let d = MangaDexDateTime::default();
                        let d = d.as_ref().saturating_sub(time::Duration::days(7));
                        Some(MangaDexDateTime::new(&d))
                    }
                    DatePeriod::Past2Weeks => {
                        let d = MangaDexDateTime::default();
                        let d = d.as_ref().saturating_sub(time::Duration::days(14));
                        Some(MangaDexDateTime::new(&d))
                    }
                    DatePeriod::ThisMonth => {
                        let d = MangaDexDateTime::default();
                        let d = d.as_ref().saturating_sub(time::Duration::days(30));
                        Some(MangaDexDateTime::new(&d))
                    }
                    DatePeriod::Past6Months => {
                        let d = MangaDexDateTime::default();
                        let d = d.as_ref().saturating_sub(time::Duration::days(30 * 6));
                        Some(MangaDexDateTime::new(&d))
                    }
                    DatePeriod::ThisYear => {
                        let d = MangaDexDateTime::default();
                        let d = d.as_ref().saturating_sub(time::Duration::days(365));
                        Some(MangaDexDateTime::new(&d))
                    }
                    _ => None,
                },
            },
            includes: <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx),
            ..Default::default()
        };
        MangaListQueries::new_with_exclude_feed(params, false, app)
            .list(ctx)
            .await
    }
    pub async fn recently_added(&self, ctx: &Context<'_>) -> crate::Result<Vec<MangaObject>> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let current_content_profile: ContentProfile = app.get_content_profile()?;
        let mut params = MangaListParams {
            limit: 20.into(),
            offset: 0.into(),
            excluded_tags: current_content_profile
                .excluded_tags
                .iter()
                .filter(|id| **id != self.0)
                .copied()
                .collect(),
            included_tags: vec![self.0],
            order: Some(MangaSortOrder::CreatedAt(OrderDirection::Descending)),
            created_at_since: {
                let d = MangaDexDateTime::default();
                let d = d.as_ref().saturating_sub(time::Duration::days(30));
                Some(MangaDexDateTime::new(&d))
            },
            includes: {
                ctx.field()
                    .selection_set()
                    .find(|f| f.name() == "relationships")
                    .map(<MangaObject as ExtractReferenceExpansion>::exctract)
                    .unwrap_or_default()
            },
            ..Default::default()
        };
        params = params.feed(&current_content_profile);

        let client = app.get_mangadex_client()?;

        Ok(params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(Into::into)
            .collect())
    }
}
