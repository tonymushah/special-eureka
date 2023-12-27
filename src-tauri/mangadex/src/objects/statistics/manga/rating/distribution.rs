use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::statistics::manga::RatingsDistribution;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct MangaRatingDistribution {
    pub r1: u32,
    pub r2: u32,
    pub r3: u32,
    pub r4: u32,
    pub r5: u32,
    pub r6: u32,
    pub r7: u32,
    pub r8: u32,
    pub r9: u32,
    pub r10: u32,
}

impl From<RatingsDistribution> for MangaRatingDistribution {
    fn from(value: RatingsDistribution) -> Self {
        Self {
            r1: value.r1,
            r2: value.r2,
            r3: value.r3,
            r4: value.r4,
            r5: value.r5,
            r6: value.r6,
            r7: value.r7,
            r8: value.r8,
            r9: value.r9,
            r10: value.r10,
        }
    }
}
