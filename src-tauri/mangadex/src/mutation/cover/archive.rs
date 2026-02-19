use std::{
    fs::File,
    io::{BufWriter, Cursor, Write},
    path::{Path, PathBuf},
};

use tauri::{AppHandle, Runtime};
use uuid::Uuid;
use zip::write::SimpleFileOptions;

enum SupportedCoverArchiveFormat {
    Zip,
    TarGz,
    TarZstd,
    TarBz2,
    TarZlib,
}

#[derive(Debug, thiserror::Error)]
#[error("Unsupported Cover archive format")]
pub struct UnsupportedCoverArchiveFormat(());

impl TryFrom<&Path> for SupportedCoverArchiveFormat {
    type Error = UnsupportedCoverArchiveFormat;
    fn try_from(value: &Path) -> Result<Self, Self::Error> {
        let ext = value
            .extension()
            .and_then(|d| d.to_str())
            .ok_or(UnsupportedCoverArchiveFormat(()))?;
        match ext {
            "zip" => Ok(Self::Zip),
            "zst" | "zstd" => Ok(Self::TarZstd),
            "gz" => Ok(Self::TarGz),
            "bz2" => Ok(Self::TarBz2),
            "zlib" => Ok(Self::TarZlib),
            _ => Err(UnsupportedCoverArchiveFormat(())),
        }
    }
}

async fn save_covers_as_zip<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    archive_path: PathBuf,
    options: Option<&super::CoverArtSaveOption>,
) -> crate::Result<()> {
    let mut zip_writer = zip::ZipWriter::new(BufWriter::new(File::create(archive_path)?));
    for cover_id in cover_ids {
        let (file_name, buf) =
            super::handle_cover_image_with_options(app, cover_id, options).await?;
        let options =
            SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
        zip_writer.start_file(file_name, options)?;
        std::io::copy(&mut Cursor::new(buf), &mut zip_writer)?;
    }
    let mut writer = zip_writer.finish()?;
    writer.flush()?;
    Ok(())
}

async fn save_covers_as_tar<R: Runtime, W: Write>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    options: Option<&super::CoverArtSaveOption>,
    writer: W,
) -> crate::Result<()> {
    let mut tar_buf = tar::Builder::new(writer);
    for cover_id in cover_ids {
        let (file_name, buf) =
            super::handle_cover_image_with_options(app, cover_id, options).await?;
        let mut header = tar::Header::new_gnu();
        header.set_path(file_name)?;
        header.set_size(buf.len().try_into()?);
        header.set_cksum();
        header.set_mode(0o644);
        tar_buf.append(&header, Cursor::new(buf))?;
    }
    tar_buf.finish()?;
    Ok(())
}

async fn save_covers_as_tar_gz<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    archive_path: PathBuf,
    options: Option<&super::CoverArtSaveOption>,
) -> crate::Result<()> {
    let mut writer = flate2::write::GzEncoder::new(
        BufWriter::new(File::create(archive_path)?),
        flate2::Compression::best(),
    );
    save_covers_as_tar(app, cover_ids, options, &mut writer).await?;
    writer.flush()?;
    writer.finish()?;
    Ok(())
}

async fn save_covers_as_tar_zstd<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    archive_path: PathBuf,
    options: Option<&super::CoverArtSaveOption>,
) -> crate::Result<()> {
    let mut writer = zstd::Encoder::new(BufWriter::new(File::create(archive_path)?), 5)?;
    save_covers_as_tar(app, cover_ids, options, &mut writer).await?;
    writer.flush()?;
    writer.finish()?;
    Ok(())
}

async fn save_covers_as_tar_bz2<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    archive_path: PathBuf,
    options: Option<&super::CoverArtSaveOption>,
) -> crate::Result<()> {
    let mut writer = bzip2::write::BzEncoder::new(
        BufWriter::new(File::create(archive_path)?),
        bzip2::Compression::best(),
    );
    save_covers_as_tar(app, cover_ids, options, &mut writer).await?;
    writer.flush()?;
    writer.finish()?;
    Ok(())
}

async fn save_covers_as_tar_zlib<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    archive_path: PathBuf,
    options: Option<&super::CoverArtSaveOption>,
) -> crate::Result<()> {
    let mut writer = flate2::write::ZlibEncoder::new(
        BufWriter::new(File::create(archive_path)?),
        flate2::Compression::best(),
    );
    save_covers_as_tar(app, cover_ids, options, &mut writer).await?;
    writer.flush()?;
    writer.finish()?;
    Ok(())
}

pub async fn save_covers_to_archive<R: Runtime>(
    app: &AppHandle<R>,
    cover_ids: Vec<Uuid>,
    archive_path: PathBuf,
    options: Option<super::CoverArtSaveOption>,
) -> crate::Result<()> {
    let format: SupportedCoverArchiveFormat = archive_path.as_path().try_into()?;
    match format {
        SupportedCoverArchiveFormat::Zip => {
            save_covers_as_zip(app, cover_ids, archive_path, options.as_ref()).await?
        }
        SupportedCoverArchiveFormat::TarGz => {
            save_covers_as_tar_gz(app, cover_ids, archive_path, options.as_ref()).await?
        }
        SupportedCoverArchiveFormat::TarZstd => {
            save_covers_as_tar_zstd(app, cover_ids, archive_path, options.as_ref()).await?
        }
        SupportedCoverArchiveFormat::TarBz2 => {
            save_covers_as_tar_bz2(app, cover_ids, archive_path, options.as_ref()).await?
        }
        SupportedCoverArchiveFormat::TarZlib => {
            save_covers_as_tar_zlib(app, cover_ids, archive_path, options.as_ref()).await?
        }
    }
    Ok(())
}
