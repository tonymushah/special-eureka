#[cfg(windows)]
pub const PROTOCOL: &str = "https://mangadex.";
#[cfg(not(windows))]
pub const PROTOCOL: &str = "mangadex://";

// [x] add this into the code
pub const MANGADEX_PAGE_LIMIT: u32 = 100;

// [x] add this into the code
pub const MANGADEX_DEFAULT_LIMIT: u32 = 10;
