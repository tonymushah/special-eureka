use async_graphql::{Context, Object, Result};
use convert_case::Casing;
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::manga::{lists::MangaResults, MangaObject as Manga},
    utils::get_mangadex_client_from_graphql_context,
};

pub struct MangaQueries;

#[Object]
impl MangaQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().id(id).get();
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            rel.selection_set().for_each(|f| match f.name() {
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
        Ok(req.includes(includes).send().await?.data.into())
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: MangaListParams,
    ) -> Result<MangaResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set().for_each(|f| {
                match f.name().to_case(convert_case::Case::Snake).as_str() {
                    "manga" => {
                        params.includes.push(ReferenceExpansionResource::Manga);
                    }
                    "cover_art" => {
                        params.includes.push(ReferenceExpansionResource::CoverArt);
                    }
                    "authors" => {
                        params.includes.push(ReferenceExpansionResource::Author);
                    }
                    "artists" => {
                        params.includes.push(ReferenceExpansionResource::Artist);
                    }
                    "author_artists" => {
                        params.includes.push(ReferenceExpansionResource::Author);
                        params.includes.push(ReferenceExpansionResource::Artist);
                    }
                    "creator" => {
                        params.includes.push(ReferenceExpansionResource::Creator);
                    }
                    _ => {}
                }
            });
        }
        params.includes.dedup();
        #[cfg(debug_assertions)]
        println!("{:?}", params.includes);
        Ok(params.send(client.inner()).await?.into())
    }
}
