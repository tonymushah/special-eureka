use std::{
    fs::{File, create_dir_all},
    io::{self, BufReader, BufWriter, Cursor, Write},
    path::Path,
};

use actix::Addr;
use async_graphql::{Context, Enum, InputObject, Object, OneofObject};
use eureka_mmanager::{
    DownloadManager,
    download::cover::CoverDownloadMessage,
    prelude::{
        AsyncCancelable, CoverDataPullAsyncTrait, DeleteDataAsyncTrait, GetCoverDownloadManager,
        TaskManagerAddr,
    },
};
use image::{DynamicImage, ImageReader};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::cover::{edit::CoverEditParam, upload::CoverUploadParam};
use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::CoverAttributes};
use tauri::{AppHandle, Manager, Runtime};
use uuid::Uuid;

use crate::{
    cache::cover::CoverImageCache,
    error::{Error, wrapped::Result},
    query::download_state::DownloadStateQueries,
    utils::{
        download::cover::cover_download, guards::PercentageValidator,
        traits_utils::MangadexAsyncGraphQLContextExt,
    },
};
use crate::{
    objects::cover::Cover,
    utils::{
        download_state::DownloadState, get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_offline_app_state, get_watches_from_graphql_context, source::SendMultiSourceData,
        traits_utils::MangadexTauriManagerExt,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct CoverMutations;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CoverMutations {
    pub async fn upload(&self, ctx: &Context<'_>, params: CoverUploadParam) -> Result<Cover> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .post_cover()
            .await;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Cover = data.into();
        let _ = watches.cover.send_online(data.clone());
        Ok(data)
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: CoverEditParam) -> Result<Cover> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .put_cover()
            .await;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Cover = data.into();
        let _ = watches.cover.send_online(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .delete_cover()
            .await;
        let _ = client.cover().cover_id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let res = cover_download(app, id).await;
        let state = DownloadStateQueries
            .cover(ctx, id)
            .await
            .map_err(|e| e.into_inner())?;
        res?;
        Ok(state)
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw.delete_cover(id).await?;
        Ok(true)
    }
    pub async fn cancel_download(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw
            .get_cover_manager()
            .await?
            .new_task(CoverDownloadMessage::new(id))
            .await?
            .cancel()
            .await?;
        Ok(true)
    }
    /// by default, it will be exported to the download folder
    pub async fn save_images(
        &self,
        ctx: &Context<'_>,
        cover_ids: Vec<Uuid>,
        export_dir: Option<String>,
        options: Option<CoverArtSaveOption>,
    ) -> Result<Option<String>, crate::error::ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        Ok(save_images(app_handle, cover_ids, export_dir, options)
            .await?
            .into_iter()
            .next())
    }
    /// by default, it will be exported to the download folder
    pub async fn save_image(
        &self,
        ctx: &Context<'_>,
        cover_id: Uuid,
        export_dir: Option<String>,
        options: Option<CoverArtSaveOption>,
    ) -> Result<String, crate::error::ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;

        Ok(save_images(app_handle, vec![cover_id], export_dir, options)
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::SaveCoverReturnSinglePathEmpty)?)
    }
    pub async fn save_images_to_archive(
        &self,
        ctx: &Context<'_>,
        cover_ids: Vec<Uuid>,
        archive_file: String,
        options: Option<CoverArtSaveOption>,
    ) -> Result<String, crate::error::ErrorWrapper> {
        todo!()
    }
    // TODO export images as compressed zip or tar.{whatever compression mode}
}

#[derive(Debug, OneofObject)]
pub enum CoverArtResizeOption {
    #[graphql(validator(custom = "PercentageValidator::default().non_zero(true)"))]
    Width(u32),
    #[graphql(validator(custom = "PercentageValidator::default().non_zero(true)"))]
    Height(u32),
}

#[derive(Debug, Clone, Copy, PartialEq, PartialOrd, Ord, Eq, Hash, Enum, Default)]
pub enum CoverImageFormat {
    #[default]
    Jpeg,
    Png,
    Avif,
    Webp,
}

impl From<CoverImageFormat> for image::ImageFormat {
    fn from(value: CoverImageFormat) -> Self {
        match value {
            CoverImageFormat::Jpeg => Self::Jpeg,
            CoverImageFormat::Png => Self::Png,
            CoverImageFormat::Avif => Self::Avif,
            CoverImageFormat::Webp => Self::WebP,
        }
    }
}

#[derive(Debug, InputObject)]
pub struct CoverArtSaveOption {
    resize_percentage: Option<CoverArtResizeOption>,
    format: Option<CoverImageFormat>,
}

async fn save_images<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    export_dir: Option<String>,
    options: Option<CoverArtSaveOption>,
) -> crate::Result<Vec<String>> {
    let export_dir = export_dir.unwrap_or(
        app.path()
            .download_dir()?
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::PathToStr)?,
    );
    create_dir_all(&export_dir)?;
    let mut paths = Vec::<String>::new();
    for cover_id in cover_ids {
        let (file, bytes) =
            handle_cover_image_with_options(app, cover_id, options.as_ref()).await?;
        let export_path = Path::new(&export_dir).join(file);
        let mut file = File::create(&export_path)?;
        {
            let mut buf_writer = BufWriter::new(&mut file);
            io::copy(&mut Cursor::new(bytes), &mut buf_writer)?;
            buf_writer.flush()?;
        }
        paths.push(
            export_path
                .to_str()
                .map(String::from)
                .ok_or(crate::Error::PathToStr)?,
        );
    }
    Ok(paths)
}

async fn handle_cover_image_with_options<R: Runtime>(
    app: &AppHandle<R>,
    cover_id: Uuid,
    options: Option<&CoverArtSaveOption>,
) -> crate::Result<(String, Vec<u8>)> {
    let client = app.get_mangadex_client()?;
    let mut img = match get_cover_image_online(&client, cover_id).await {
        Ok(i) => i,
        Err(err) => {
            log::error!("{err}");
            let handle = app.get_offline_app_state()?;
            let read = handle.read().await;
            let app_state = read
                .as_ref()
                .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
            get_cover_image_offline(&app_state.app_state, cover_id).await?
        }
    };
    let mut bytes = Cursor::new(Vec::<u8>::new());

    let file: String = if let Some(options) = options {
        if let Some(resize) = &options.resize_percentage {
            let (nw, nh) = match resize {
                CoverArtResizeOption::Width(per) => {
                    let new_width = (img.width() * per) / 100;
                    let new_height = (img.height() * new_width) / img.width();
                    (new_width, new_height)
                }
                CoverArtResizeOption::Height(per) => {
                    let new_height = (img.height() * per) / 100;
                    let new_width = (img.width() * new_height) / img.height();
                    (new_width, new_height)
                }
            };
            img = img.resize(nw, nh, image::imageops::FilterType::Lanczos3);
        }
        match options.format {
            Some(CoverImageFormat::Avif) => {
                img.write_to(&mut bytes, image::ImageFormat::Avif)?;
                format!("{cover_id}.avif")
            }
            Some(CoverImageFormat::Png) => {
                img.write_to(&mut bytes, image::ImageFormat::Png)?;
                format!("{cover_id}.png")
            }
            Some(CoverImageFormat::Webp) => {
                img.write_to(&mut bytes, image::ImageFormat::WebP)?;
                format!("{cover_id}.webp")
            }
            _ => {
                img.write_to(&mut bytes, image::ImageFormat::Jpeg)?;
                format!("{cover_id}.jpg")
            }
        }
    } else {
        img.write_to(&mut bytes, image::ImageFormat::Jpeg)?;
        format!("{cover_id}.jpg")
    };
    Ok((file, bytes.into_inner()))
}

// - [x] extract image from cache first
// - [x] if not fetch it and make the entry back in cache
// - [x] return buffer after
async fn get_cover_image_online(
    client: &MangaDexClient,
    cover_id: Uuid,
) -> crate::Result<DynamicImage> {
    let (buf, _) = CoverImageCache::get_cover_image_by_cover_id(cover_id, None, client).await?;
    Ok(ImageReader::new(Cursor::new(buf))
        .with_guessed_format()?
        .decode()?)
}

async fn get_cover_image_offline(
    app: &Addr<DownloadManager>,
    cover_id: Uuid,
) -> crate::Result<DynamicImage> {
    let buf = BufReader::new(app.get_cover_image(cover_id).await?);
    Ok(ImageReader::new(buf).with_guessed_format()?.decode()?)
}

