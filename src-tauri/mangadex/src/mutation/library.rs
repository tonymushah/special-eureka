use async_graphql::{Context, Object};

use crate::{
    export::{
        csv::{ExportMDLibraryToCSVOptions, export_library_to_csv},
        myanimelist::{MDLibraryToMyAnimeListExportOption, export_md_library_to_my_anime_list},
    },
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

pub struct LibraryMutations;

#[Object]
impl LibraryMutations {
    pub async fn export_as_my_anime_list(
        &self,
        ctx: &Context<'_>,
        options: MDLibraryToMyAnimeListExportOption,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_md_library_to_my_anime_list::<tauri::Wry>(ctx.get_app_handle()?, options)
            .await
            .map_err(Into::into)
    }
    pub async fn export_as_csv(
        &self,
        ctx: &Context<'_>,
        options: ExportMDLibraryToCSVOptions,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_library_to_csv::<tauri::Wry>(ctx.get_app_handle()?, options)
            .await
            .map_err(Into::into)
    }
}
