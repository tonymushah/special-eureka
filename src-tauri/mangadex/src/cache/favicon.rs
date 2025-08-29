use std::{
    fs::{File, create_dir_all, remove_dir_all},
    io::{BufReader, BufWriter, Read, Write},
    path::PathBuf,
};

use bytes::Bytes;
use favicon_picker::Favicon;
use mangadex_api::MangaDexClient;
use reqwest::Client;
use tauri::{AppHandle, Manager, Runtime};
use url::Url;

pub fn get_favicons_dir<R: Runtime>(app: &AppHandle<R>) -> crate::Result<PathBuf> {
    let dir = app
        .path()
        .app_cache_dir()
        .map_err(|_| crate::Error::AppCacheDirNotFound)?
        .join("favicons");
    create_dir_all(&dir)?;
    Ok(dir)
}

pub fn clear_favicons_dir<R: Runtime>(app: &AppHandle<R>) -> crate::Result<()> {
    let dir = get_favicons_dir(app)?;
    let _ = remove_dir_all(&dir);
    let _ = create_dir_all(&dir);
    Ok(())
}

pub fn get_favicon_file_path_from_cache_by_domain<R: Runtime>(
    domain: &str,
    app: &AppHandle<R>,
) -> crate::Result<PathBuf> {
    let dir = get_favicons_dir(app)?;
    Ok(dir.join(domain))
}

pub fn get_favicon_file_path_from_cache<R: Runtime>(
    base_url: &Url,
    app: &AppHandle<R>,
) -> crate::Result<PathBuf> {
    let domain = base_url.domain().ok_or(crate::Error::DomainUrlNotFound)?;
    get_favicon_file_path_from_cache_by_domain(domain, app)
}

pub fn get_favicon_file_buf_read_from_cache<R: Runtime>(
    base_url: &Url,
    app: &AppHandle<R>,
) -> crate::Result<BufReader<File>> {
    Ok(BufReader::new(File::open(
        get_favicon_file_path_from_cache(base_url, app)?,
    )?))
}

pub fn get_favicon_file_buf_write_from_cache<R: Runtime>(
    base_url: &Url,
    app: &AppHandle<R>,
) -> crate::Result<BufWriter<File>> {
    Ok(BufWriter::new(File::create(
        get_favicon_file_path_from_cache(base_url, app)?,
    )?))
}

pub fn get_favicon_from_cache<R: Runtime>(
    base_url: &Url,
    app: &AppHandle<R>,
) -> crate::Result<Bytes> {
    let mut reader = get_favicon_file_buf_read_from_cache(base_url, app)?;
    let mut buf = Vec::<u8>::new();
    reader.read_to_end(&mut buf)?;
    Ok(buf.into())
}

pub async fn get_favicon_online<R: Runtime>(
    base_url: &Url,
    client: Client,
) -> crate::Result<Bytes> {
    let client2 = client.clone();
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

pub async fn get_favicon<R: Runtime>(base_url: &Url, app: &AppHandle<R>) -> crate::Result<Bytes> {
    if let Ok(res) = get_favicon_from_cache(base_url, app) {
        Ok(res)
    } else {
        let mangadex_client = app
            .try_state::<MangaDexClient>()
            .ok_or(crate::Error::MangaDexClientNotFound)?;
        let mangadex_client_ref = mangadex_client.get_http_client();
        let client_read = mangadex_client_ref.read().await;
        let online = get_favicon_online::<R>(base_url, client_read.client.clone()).await?;
        let mut cache_buf_writer = get_favicon_file_buf_write_from_cache(base_url, app)?;
        cache_buf_writer.write_all(&online)?;
        cache_buf_writer.flush()?;
        Ok(online)
    }
}
