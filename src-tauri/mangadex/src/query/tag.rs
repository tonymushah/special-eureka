use async_graphql::{Context, Object, Result};
use mangadex_api_types_rust::Tag as TagEnum;

use crate::{
    objects::tag::{lists::TagResults, Tag},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Clone, Copy, Debug, Default)]
pub struct TagQueries;

#[Object]
impl TagQueries {
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<TagResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(client.manga().tag().get().send().await?.into())
    }
    #[graphql(skip)]
    pub async fn get_offline(&self, ctx: &Context<'_>) -> Result<TagResults> {
        let tags: Vec<TagEnum> = vec![
            TagEnum::Gore,
            TagEnum::SexualViolence,
            TagEnum::Adaptation,
            TagEnum::Anthology,
            TagEnum::AwardWinning,
            TagEnum::Doujinshi,
            TagEnum::FanColored,
            TagEnum::FourKoma,
            TagEnum::FullColor,
            TagEnum::LongStrip,
            TagEnum::OfficialColored,
            TagEnum::Oneshot,
            TagEnum::UserCreated,
            TagEnum::WebComic,
            TagEnum::Action,
            TagEnum::Adventure,
            TagEnum::BoysLove,
            TagEnum::Comedy,
            TagEnum::Crime,
            TagEnum::Drama,
            TagEnum::Fantasy,
            TagEnum::GirlsLove,
            TagEnum::Historical,
            TagEnum::Horror,
            TagEnum::Isekai,
            TagEnum::MagicalGirls,
            TagEnum::Mecha,
            TagEnum::Medical,
            TagEnum::Mystery,
            TagEnum::Philosophical,
            TagEnum::Psychological,
            TagEnum::Romance,
            TagEnum::SciFi,
            TagEnum::SliceOfLife,
            TagEnum::Sports,
            TagEnum::Superhero,
            TagEnum::Thriller,
            TagEnum::Tragedy,
            TagEnum::Wuxia,
            TagEnum::Aliens,
            TagEnum::Animals,
            TagEnum::Cooking,
            TagEnum::Crossdressing,
            TagEnum::Delinquents,
            TagEnum::Demons,
            TagEnum::Genderswap,
            TagEnum::Ghosts,
            TagEnum::Gyaru,
        ];
        todo!()
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<TagResults> {
        if let Ok(res) = self.get_online(ctx).await {
            Ok(res)
        } else {
            self.get_offline(ctx).await
        }
    }
}
