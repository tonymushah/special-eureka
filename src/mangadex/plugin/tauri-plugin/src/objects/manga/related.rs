use async_graphql::{ComplexObject, Context, Result, SimpleObject};
use mangadex_api_types_rust::MangaRelation;
use uuid::Uuid;

use super::{attributes::GraphQLMangaAttributes, MangaObject};

#[derive(Clone, SimpleObject)]
#[graphql(complex)]
pub struct MangaRelated {
    pub id: Uuid,
    pub related: MangaRelation,
    #[graphql(skip)]
    pub obj: MangaObject,
}

#[ComplexObject]
impl MangaRelated {
    pub async fn attributes(&self, ctx: &Context<'_>) -> Result<GraphQLMangaAttributes> {
        self.obj.attributes(&ctx).await
    }
}
