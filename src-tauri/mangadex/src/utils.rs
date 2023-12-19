use mangadex_api::MangaDexClient;
use once_cell::sync::OnceCell;
use std::io::Result;
use tauri::{AppHandle, Manager, Runtime, State};

use crate::app_state::OfflineAppState;
static mut INDENTIFIER: OnceCell<String> = OnceCell::new();

pub fn set_indentifier(identifier: String) -> Result<()> {
    match std::thread::spawn(move || -> Result<()> {
        unsafe {
            match INDENTIFIER.set(identifier) {
                Ok(_) => return Ok(()),
                Err(_) => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The identifier already setted",
                    ));
                }
            }
        }
    })
    .join()
    {
        Ok(res) => res,
        Err(_) => Err(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Error on loading notification handle",
        )),
    }
}

pub fn get_indentifier() -> Result<&'static String> {
    let data_: &'static String;
    unsafe {
        match INDENTIFIER.get() {
            None => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "Identifier not found",
                ))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub fn get_notification_handle_mut() -> Result<&'static mut String> {
    let data_: &'static mut String;
    unsafe {
        match INDENTIFIER.get_mut() {
            None => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "Identifier not found",
                ))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub(crate) fn get_mangadex_client_from_graphql_context<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<State<'ctx, MangaDexClient>> {
    Ok(get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<MangaDexClient>()
        .ok_or(async_graphql::Error::new("MangaDexClient not found"))?)
}

pub(crate) fn get_app_handle_from_async_graphql<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<&'ctx AppHandle<R>> {
    ctx.data::<AppHandle<R>>()
}

pub(crate) fn get_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<State<'ctx, OfflineAppState>> {
    Ok(get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<OfflineAppState>()
        .ok_or(async_graphql::Error::new("OfflineAppState not found"))?)
}
