pub mod distribution;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::statistics::manga::MangaRating as Rating;

use self::distribution::MangaRatingDistribution;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct MangaRating {
    pub average: Option<f32>,
    pub bayesian: Option<f32>,
    pub distrubution: MangaRatingDistribution,
}

impl From<Rating> for MangaRating {
    fn from(value: Rating) -> Self {
        Self {
            average: value.average,
            bayesian: value.bayesian,
            distrubution: value.distribution.into(),
        }
    }
}
