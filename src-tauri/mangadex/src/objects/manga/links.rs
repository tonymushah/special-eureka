use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::MangaLinks as Links;
use url::Url;

#[derive(Clone, Debug)]
pub struct MangaLinks(Links);

impl Deref for MangaLinks {
    type Target = Links;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Links> for MangaLinks {
    fn from(value: Links) -> Self {
        Self(value)
    }
}

#[Object]
impl MangaLinks {
    pub async fn has_no_links(&self) -> bool {
        self.amazon.is_none()
            && self.anilist.is_none()
            && self.anime_planet.is_none()
            && self.book_walker.is_none()
            && self.cd_japan.is_none()
            && self.ebook_japan.is_none()
            && self.english_translation.is_none()
            && self.kitsu.is_none()
            && self.manga_updates.is_none()
            && self.my_anime_list.is_none()
            && self.novel_updates.is_none()
            && self.raw.is_none()
    }
    pub async fn amazon(&self) -> Option<&Url> {
        self.amazon.as_ref()
    }
    pub async fn anilist(&self) -> Option<Url> {
        let inner = self.anilist.as_ref()?;
        Url::parse("https://anilist.co/manga/")
            .ok()?
            .join(inner)
            .ok()
    }
    pub async fn anime_planet(&self) -> Option<Url> {
        let inner = self.anime_planet.as_ref()?;
        Url::parse("https://www.anime-planet.com/manga/")
            .ok()?
            .join(inner)
            .ok()
    }
    pub async fn book_walker(&self) -> Option<Url> {
        let inner = self.book_walker.as_ref()?;
        Url::parse(&inner.to_string()).ok()
    }
    pub async fn cd_japan(&self) -> Option<Url> {
        let inner = self.cd_japan.as_ref()?;
        Url::parse(inner).ok()
    }
    pub async fn ebook_japan(&self) -> Option<&Url> {
        self.ebook_japan.as_ref()
    }
    pub async fn english_translation(&self) -> Option<Url> {
        self.english_translation
            .as_ref()
            .and_then(|u| Url::parse(u).ok())
    }
    pub async fn kitsu(&self) -> Option<Url> {
        let inner = self.kitsu.as_ref()?;
        if let Ok(u) = inner.parse::<usize>() {
            Url::parse(format!("https://kitsu.io/api/edge/manga/{u}").as_str()).ok()
        } else {
            Url::parse(format!("https://kitsu.io/api/edge/manga?filter[slug]={inner}").as_str())
                .ok()
        }
    }
    pub async fn manga_updates(&self) -> Option<Url> {
        Url::parse(&self.manga_updates.as_ref()?.to_string()).ok()
    }
    pub async fn my_anime_list(&self) -> Option<Url> {
        Url::parse(&self.my_anime_list.as_ref()?.to_string()).ok()
    }
    pub async fn novel_updates(&self) -> Option<Url> {
        Url::parse(&self.novel_updates.as_ref()?.to_string()).ok()
    }
    pub async fn raw(&self) -> Option<&Url> {
        self.raw.as_ref()
    }
}
