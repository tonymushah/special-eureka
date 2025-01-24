use mangadex_api_input_types::{
    chapter::list::ChapterListParams,
    feed::{
        custom_list_feed::CustomListMangaFeedParams, followed_manga_feed::FollowedMangaFeedParams,
    },
    manga::{
        aggregate::MangaAggregateParam, feed::MangaFeedParams, list::MangaListParams,
        random::MangaRandomParams,
    },
};

use super::Feedable;

impl Feedable for MangaListParams {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.original_language.is_empty() {
            self.original_language = content_profile.original_languages.clone();
        }
        if self.excluded_original_language.is_empty() {
            self.excluded_original_language = content_profile.excluded_original_language.clone();
        }
        if self.publication_demographic.is_empty() {
            self.publication_demographic = content_profile.publication_demographic.clone();
        }
        if self.included_tags.is_empty() {
            self.included_tags = content_profile.included_tags.clone();
        }
        if self.included_tags_mode.is_none() {
            self.included_tags_mode = content_profile.included_tags_mode;
        }
        if self.excluded_tags.is_empty() {
            self.excluded_tags = content_profile.excluded_tags.clone();
        }
        if self.excluded_tags_mode.is_none() {
            self.excluded_tags_mode = content_profile.excluded_tags_mode;
        }
        if self.status.is_empty() {
            self.status = content_profile.status.clone();
        }
        if self.available_translated_language.is_empty() {
            self.available_translated_language = content_profile.translated_languages.clone();
        }
        if self.content_rating.is_empty() {
            self.content_rating = content_profile.content_rating.clone();
        }
        self
    }
}

impl Feedable for ChapterListParams {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.content_rating.is_empty() {
            self.content_rating = content_profile.content_rating.clone();
        }
        if self.excluded_original_languages.is_empty() {
            self.excluded_original_languages = content_profile.excluded_original_language.clone();
        }
        if self.excluded_groups.is_empty() {
            self.excluded_groups = content_profile.excluded_groups.clone();
        }
        if self.excluded_uploaders.is_empty() {
            self.excluded_uploaders = content_profile.excluded_uploaders.clone();
        }
        if self.original_languages.is_empty() {
            self.original_languages = content_profile.original_languages.clone();
        }
        if self.translated_languages.is_empty() {
            self.translated_languages = content_profile.translated_languages.clone();
        }
        self
    }
}

impl Feedable for MangaAggregateParam {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.translated_language.is_empty() {
            self.translated_language = content_profile.translated_languages.clone();
        }
        self
    }
}

impl Feedable for MangaRandomParams {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.included_tags.is_empty() {
            self.included_tags = content_profile.included_tags.clone();
        }
        if self.included_tags_mode.is_none() {
            self.included_tags_mode = content_profile.included_tags_mode;
        }
        if self.excluded_tags.is_empty() {
            self.excluded_tags = content_profile.excluded_tags.clone();
        }
        if self.excluded_tags_mode.is_none() {
            self.excluded_tags_mode = content_profile.excluded_tags_mode;
        }
        if self.content_rating.is_empty() {
            self.content_rating = content_profile.content_rating.clone();
        }
        self
    }
}

impl Feedable for MangaFeedParams {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.content_rating.is_empty() {
            self.content_rating = content_profile.content_rating.clone();
        }
        if self.excluded_groups.is_empty() {
            self.excluded_groups = content_profile.excluded_groups.clone();
        }
        if self.excluded_uploaders.is_empty() {
            self.excluded_uploaders = content_profile.excluded_uploaders.clone();
        }
        if self.excluded_original_language.is_empty() {
            self.excluded_original_language = content_profile.excluded_original_language.clone();
        }
        if self.excluded_uploaders.is_empty() {
            self.excluded_uploaders = content_profile.excluded_uploaders.clone();
        }
        if self.original_language.is_empty() {
            self.original_language = content_profile.original_languages.clone();
        }
        if self.translated_language.is_empty() {
            self.translated_language = content_profile.translated_languages.clone();
        }
        self
    }
}

impl Feedable for CustomListMangaFeedParams {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.content_rating.is_empty() {
            self.content_rating = content_profile.content_rating.clone();
        }
        if self.excluded_groups.is_empty() {
            self.excluded_groups = content_profile.excluded_groups.clone();
        }
        if self.excluded_original_language.is_empty() {
            self.excluded_original_language = content_profile.excluded_original_language.clone();
        }
        if self.excluded_original_language.is_empty() {
            self.excluded_original_language = content_profile.excluded_original_language.clone();
        }
        if self.excluded_uploaders.is_empty() {
            self.excluded_uploaders = content_profile.excluded_uploaders.clone();
        }
        if self.original_language.is_empty() {
            self.original_language = content_profile.original_languages.clone();
        }
        if self.translated_language.is_empty() {
            self.translated_language = content_profile.translated_languages.clone();
        }
        self
    }
}

impl Feedable for FollowedMangaFeedParams {
    fn feed(mut self, content_profile: &super::ContentProfile) -> Self {
        if self.excluded_groups.is_empty() {
            self.excluded_groups = content_profile.excluded_groups.clone();
        }
        if self.excluded_original_language.is_empty() {
            self.excluded_original_language = content_profile.excluded_original_language.clone();
        }
        if self.excluded_original_language.is_empty() {
            self.excluded_original_language = content_profile.excluded_original_language.clone();
        }
        if self.excluded_uploaders.is_empty() {
            self.excluded_uploaders = content_profile.excluded_uploaders.clone();
        }
        if self.original_language.is_empty() {
            self.original_language = content_profile.original_languages.clone();
        }
        if self.translated_language.is_empty() {
            self.translated_language = content_profile.translated_languages.clone();
        }
        self
    }
}
