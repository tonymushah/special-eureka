use async_graphql::{Context, SelectionField, SimpleObject};
use mangadex_api_schema_rust::v5::Results;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

pub mod api_client;
pub mod auth;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod legacy_id_mapping;
pub mod manga;
pub mod manga_chapter_group;
pub mod oauth;
pub mod rating;
pub mod read_marker;
pub mod report;
pub mod report_reason;
pub mod scanlation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct ResultsInfo {
    pub limit: u32,
    pub offset: u32,
    pub total: u32,
}

impl<T> From<Results<T>> for ResultsInfo {
    fn from(value: Results<T>) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
            total: value.total,
        }
    }
}

impl<T> From<&Results<T>> for ResultsInfo {
    fn from(value: &Results<T>) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
            total: value.total,
        }
    }
}

pub trait ExtractReferenceExpansion<'a> {
    fn exctract(field: SelectionField<'a>) -> Vec<ReferenceExpansionResource>;
}

pub trait ExtractReferenceExpansionFromContext<'a>: ExtractReferenceExpansion<'a> {
    fn exctract(ctx: &'a Context<'a>) -> Vec<ReferenceExpansionResource> {
        <Self as ExtractReferenceExpansion<'a>>::exctract(ctx.field())
    }
}

pub trait GetId {
    fn get_id(&self) -> Uuid;
}

pub trait GetAttributes {
    type Attributes;
    fn get_attributes(&self) -> Self::Attributes;
}
