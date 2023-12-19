use async_graphql::{Context, InputObject, Object, Result};
use mangadex_api_input_types::custom_list::get_user_lists::UserCustomListParams;
use uuid::Uuid;

use crate::objects::custom_list::{lists::CustomListResults, CustomList};

#[derive(Debug, Clone, Copy)]
pub struct CustomListQueries;

#[Object]
impl CustomListQueries {
    pub async fn get(&self, _ctx: &Context<'_>, _id: Uuid) -> Result<CustomList> {
        todo!()
    }
    pub async fn current_logged_lists(
        &self,
        _ctx: &Context<'_>,
        #[graphql(default)] _params: CurrentLoggedLists,
    ) -> Result<CustomListResults> {
        todo!()
    }
    pub async fn get_user_lists(
        &self,
        _ctx: &Context<'_>,
        _params: UserCustomListParams,
    ) -> Result<CustomListResults> {
        todo!()
    }
}

#[derive(Debug, Clone, Default, InputObject)]
pub struct CurrentLoggedLists {
    offset: Option<u32>,
    limit: Option<u32>,
}
