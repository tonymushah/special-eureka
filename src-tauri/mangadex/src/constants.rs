#[cfg(windows)]
pub const PROTOCOL: &str = "https://mangadex.";
#[cfg(not(windows))]
pub const PROTOCOL: &str = "mangadex://";