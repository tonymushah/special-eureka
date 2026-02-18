use std::path::Path;

enum SupportedCoverArchiveFormat {
    Zip,
    TarGz,
    TarZstd,
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
            _ => Err(UnsupportedCoverArchiveFormat(())),
        }
    }
}
