use std::{
    fs::{File, create_dir_all},
    io::{self, BufReader, BufWriter, Cursor, Write},
    path::Path,
};

use actix::Addr;
use async_graphql::{Enum, InputObject, OneofObject};
use eureka_mmanager::{DownloadManager, prelude::CoverDataPullAsyncTrait};
use image::{DynamicImage, ImageReader};
use mangadex_api::MangaDexClient;
use tauri::{AppHandle, Manager, Runtime};
use uuid::Uuid;

use crate::utils::traits_utils::MangadexTauriManagerExt;
use crate::{cache::cover::CoverImageCache, utils::guards::PercentageValidator};

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

pub async fn save_images<R: Runtime>(
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

pub async fn handle_cover_image_with_options<R: Runtime>(
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
pub async fn get_cover_image_online(
    client: &MangaDexClient,
    cover_id: Uuid,
) -> crate::Result<DynamicImage> {
    let (buf, _) = CoverImageCache::get_cover_image_by_cover_id(cover_id, None, client).await?;
    Ok(ImageReader::new(Cursor::new(buf))
        .with_guessed_format()?
        .decode()?)
}

pub async fn get_cover_image_offline(
    app: &Addr<DownloadManager>,
    cover_id: Uuid,
) -> crate::Result<DynamicImage> {
    let buf = BufReader::new(app.get_cover_image(cover_id).await?);
    Ok(ImageReader::new(buf).with_guessed_format()?.decode()?)
}
