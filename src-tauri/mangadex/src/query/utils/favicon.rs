use std::{
    fs::{create_dir_all, File},
    io::{BufReader, BufWriter, Read, Write},
    path::PathBuf,
};

use async_graphql::Context;
use bytes::Bytes;
use favicon_picker::Favicon;
use tauri::{api::path::app_cache_dir, Config, Runtime};
use url::Url;

use crate::utils::{get_app_handle_from_async_graphql, get_mangadex_client_from_graphql_context};

fn get_favicon_file_path_from_cache(base_url: &Url, config: &Config) -> crate::Result<PathBuf> {
    let dir = app_cache_dir(config)
        .ok_or(crate::Error::AppCacheDirNotFound)?
        .join("favicons");
    create_dir_all(&dir)?;
    let domain = base_url.domain().ok_or(crate::Error::DomainUrlNotFound)?;
    Ok(dir.join(domain))
}

fn get_favicon_file_buf_read_from_cache(
    base_url: &Url,
    config: &Config,
) -> crate::Result<BufReader<File>> {
    Ok(BufReader::new(File::open(
        get_favicon_file_path_from_cache(base_url, config)?,
    )?))
}

fn get_favicon_file_buf_write_from_cache(
    base_url: &Url,
    config: &Config,
) -> crate::Result<BufWriter<File>> {
    Ok(BufWriter::new(File::create(
        get_favicon_file_path_from_cache(base_url, config)?,
    )?))
}

fn get_favicon_from_cache(base_url: &Url, config: &Config) -> crate::Result<Bytes> {
    let mut reader = get_favicon_file_buf_read_from_cache(base_url, config)?;
    let mut buf = Vec::<u8>::new();
    reader.read_to_end(&mut buf)?;
    Ok(buf.into())
}

async fn get_favicon_online<R: Runtime>(base_url: &Url, ctx: &Context<'_>) -> crate::Result<Bytes> {
    let client_md = get_mangadex_client_from_graphql_context::<R>(ctx)?;
    let client_md_inner = client_md.get_http_client();
    let client_md_read = client_md_inner.read().await;
    let client = client_md_read.client.clone();
    let client2 = client_md_read.client.clone();
    let base_url = base_url.clone();

    let favicon = tauri::async_runtime::spawn_blocking(move || {
        std::thread::spawn(move || -> crate::Result<Vec<Favicon>> {
            let rt = tokio::runtime::Runtime::new()?;
            rt.block_on(async move {
                Ok::<_, crate::Error>(
                    favicon_picker::get_favicons_from_url(&client, &base_url).await?,
                )
            })
        })
        .join()
        .map_err(|_| crate::Error::StdThreadJoinError)
    })
    .await???
    .into_iter()
    .next()
    .ok_or(crate::Error::FaviconNotFound)?
    .get_image_bytes(&client2)
    .await?;
    Ok(favicon)
}

pub async fn get_favicon<R: Runtime>(base_url: &Url, ctx: &Context<'_>) -> crate::Result<Bytes> {
    let app = get_app_handle_from_async_graphql::<R>(ctx)?;
    if let Ok(res) = get_favicon_from_cache(base_url, app.config().as_ref()) {
        Ok(res)
    } else {
        let online = get_favicon_online::<R>(base_url, ctx).await?;
        let mut cache_buf_writer =
            get_favicon_file_buf_write_from_cache(base_url, app.config().as_ref())?;
        cache_buf_writer.write_all(&online)?;
        cache_buf_writer.flush()?;
        Ok(online)
    }
}
