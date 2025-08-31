use async_graphql::{Context, Object};

use crate::{
    export::{
        csv::{ExportIdsLibraryToCSVOptions, export_manga_ids_to_csv},
        myanimelist::{MDIdsToMyAnimeListExportOption, export_manga_ids_to_my_anime_list},
    },
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

pub struct MangaExportMutations;

#[Object]
impl MangaExportMutations {
    pub async fn ids_as_my_anime_list(
        &self,
        ctx: &Context<'_>,
        options: MDIdsToMyAnimeListExportOption,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_manga_ids_to_my_anime_list::<tauri::Wry>(ctx.get_app_handle()?, options)
            .await
            .map_err(Into::into)
    }
    pub async fn ids_as_csv(
        &self,
        ctx: &Context<'_>,
        options: ExportIdsLibraryToCSVOptions,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_manga_ids_to_csv::<tauri::Wry>(ctx.get_app_handle()?, options)
            .await
            .map_err(Into::into)
    }
}
