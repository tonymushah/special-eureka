use async_graphql::ErrorExtensions;

#[derive(Debug, thiserror::Error)]
pub enum Error {}

impl ErrorExtensions for Error {
    fn extend(&self) -> async_graphql::Error {
        async_graphql::Error::new(format!("{}", self))
    }
}
