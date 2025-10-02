use mangadex_api_types_rust::ContentRating;

#[cfg(windows)]
pub const PROTOCOL: &str = "https://mangadex.";
#[cfg(not(windows))]
pub const PROTOCOL: &str = "mangadex://";

// [x] add this into the code
pub const MANGADEX_PAGE_LIMIT: u32 = 90;

// [x] add this into the code
pub const MANGADEX_DEFAULT_LIMIT: u32 = 10;

pub const ALL_CONTENT_RATING: &[ContentRating] = &[
    ContentRating::Safe,
    ContentRating::Suggestive,
    ContentRating::Erotica,
    ContentRating::Pornographic,
];
