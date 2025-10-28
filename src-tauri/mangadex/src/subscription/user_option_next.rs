use async_graphql::{Context, Subscription};
use futures_util::Stream;

use crate::{
    store::types::enums::content_profile_warning::ContentProfileWarningMode,
    subscription::utils::WatchSubscriptionStream,
    utils::watch::{
        content_blur::ContentProfileBlurWatch,
        content_profile_warning::ContentProfileWarningModeWatch, force_443::ForcePort443Watch,
    },
};

#[derive(Debug, Default, Clone, Copy)]
pub struct UserOptionNextSubscriptions;

#[Subscription]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl UserOptionNextSubscriptions {
    pub async fn watch_force_port_443<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> crate::Result<impl Stream<Item = bool> + 'ctx, crate::error::ErrorWrapper> {
        WatchSubscriptionStream::from_async_graphql_context_watch_as_ref::<
            ForcePort443Watch,
            tauri::Wry,
        >(ctx)
        .map_err(crate::error::ErrorWrapper::from)
    }
    pub async fn watch_content_profile_blur<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> crate::Result<impl Stream<Item = bool> + 'ctx, crate::error::ErrorWrapper> {
        WatchSubscriptionStream::from_async_graphql_context_watch_as_ref::<
            ContentProfileBlurWatch,
            tauri::Wry,
        >(ctx)
        .map_err(crate::error::ErrorWrapper::from)
    }
    pub async fn watch_content_profile_warning_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> crate::Result<
        impl Stream<Item = ContentProfileWarningMode> + 'ctx,
        crate::error::ErrorWrapper,
    > {
        WatchSubscriptionStream::from_async_graphql_context_watch_as_ref::<
            ContentProfileWarningModeWatch,
            tauri::Wry,
        >(ctx)
        .map_err(crate::error::ErrorWrapper::from)
    }
}
