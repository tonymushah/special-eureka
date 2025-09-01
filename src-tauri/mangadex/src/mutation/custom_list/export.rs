use async_graphql::{Context, Object};

use crate::{
    export::{
        csv::{ExportCustomListsToCSVOptions, export_custom_lists_to_csv},
        myanimelist::{
            MDCustomListsToMyAnimeListExportOption, export_custom_lists_to_my_anime_list,
        },
    },
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

pub struct CustomListExportMutations;

#[Object]
impl CustomListExportMutations {
    pub async fn as_my_anime_list(
        &self,
        ctx: &Context<'_>,
        option: MDCustomListsToMyAnimeListExportOption,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_custom_lists_to_my_anime_list::<tauri::Wry>(ctx.get_app_handle()?, option)
            .await
            .map_err(Into::into)
    }
    pub async fn as_csv(
        &self,
        ctx: &Context<'_>,
        option: ExportCustomListsToCSVOptions,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_custom_lists_to_csv::<tauri::Wry>(ctx.get_app_handle()?, option)
            .await
            .map_err(Into::into)
    }
}
