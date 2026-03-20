macro_rules! keys {
	($($key:ident = $val:literal,)*) => {
		$(
			pub const $key: &str = $val;
		)*
    };
}

keys! {
    CLIENT_INFO = "client_info",
    PATH = "mangadex.store",
    REFRESH_TOKEN = "refresh_token",
    PAGE_DIRECTION  = "page_direction",
    SIDEBAR_DIRECTION = "sidebar_direction",
    READING_MODE = "reading_mode",
    IMAGE_FIT = "image_fit",
    LONGSTRIP_IMAGE_WIDTH = "longstrip_image_width",
    MANGA_LIST_STYLE = "manga-list-style",
    THEME_PROFILE = "theme_profile",
    THEME_PROFILE_KEY = "theme_profile_key",
    CHAPTER_FEED_STYLE = "chapter_feed_style",
    PAGINATION_STYLE = "pagination_style",
    CONTENT_PROFILE = "content_profile",
    CONTENT_PROFILE_KEY = "content_profile_key",
    OFFLINE_CONFIG = "offline_config",
    CHAPTERS_QUALITY = "chapters_quality",
    PAGE_LIMIT = "page_limit",
    CHAPTER_LAYOUT = "chapter_layout",
    FORCE_443 = "force_443",
    CONTENT_PROFILE_WARNING_MODE = "content_profile_warning_mode",
    CONTENT_PROFILE_BLUR = "content_profile_blur",
    TOAST_NOTIFY = "toast_notify",
    MANGA_INFOS_POSITIONS = "manga_infos_positions",
    HIDE_READ_TITLES = "hide_read_titles",
}
