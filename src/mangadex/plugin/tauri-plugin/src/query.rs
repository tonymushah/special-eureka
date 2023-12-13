pub mod manga;

use async_graphql::{Object, Result};

pub struct Query;

#[Object]
impl Query{
    async fn manga(&self) -> Result<String>{
        Ok(String::from(""))
    }
}