pub mod api_client;
pub mod author;
pub mod chapter;
pub mod chapter_layout;
pub mod chapter_pages;
pub mod cover;
pub mod custom_list;
pub mod download_state;
pub mod is_appstate_mounted;
pub mod is_following;
pub mod is_logged;
pub mod legacy;
pub mod manga;
pub mod manga_reading_state;
pub mod oauth;
pub mod rating;
pub mod read_marker;
pub mod reading_state;
pub mod scanlation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;
pub mod user_option;
pub mod user_option_next;
pub mod utils;

use async_graphql::MergedSubscription;

#[derive(Debug, Default, Clone, Copy, MergedSubscription)]
pub struct Subscriptions(
    legacy::LegacySubscriptions,
    chapter_layout::ChapterLayoutSubscription,
    chapter_pages::ChapterPagesSubscription,
    user_option_next::UserOptionNextSubscriptions,
);
