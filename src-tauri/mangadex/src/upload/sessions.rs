use std::{collections::BTreeMap, ops::Deref, path::PathBuf};

use async_graphql::{InputObject, SimpleObject};
use mangadex_api_types_rust::{Language, MangaDexDateTime};
use tempfile::TempDir;
use url::Url;
use uuid::Uuid;

use super::ArcRwLock;

#[derive(Clone, Debug, SimpleObject, InputObject)]
#[graphql(input_name = "InternUploadSessionCommitDataInput")]
pub struct InternUploadSessionCommitData {
    pub volume: Option<String>,
    pub chapter: Option<String>,
    pub title: Option<String>,
    pub translated_language: Language,
    pub external_url: Option<Url>,
    pub publish_at: Option<MangaDexDateTime>,
    /// Required after the May 15th incident
    pub terms_accepted: Option<bool>,
}

#[derive(Debug)]
pub struct InternUploadSession {
    pub(super) manga_id: Uuid,
    pub(super) groups: Vec<Uuid>,
    pub(super) temp_dir: TempDir,
    pub(super) images: Vec<String>,
    pub(super) commit_data: Option<InternUploadSessionCommitData>,
}

#[derive(Debug, thiserror::Error)]
pub enum CheckUploadSessionError {}

impl InternUploadSession {
    pub fn check(&self) -> Result<(), CheckUploadSessionError> {
        todo!()
    }
}

impl InternUploadSession {
    pub fn to_gql_object(&self) -> InternUploadSessionGQLObject {
        InternUploadSessionGQLObject {
            manga_id: self.manga_id,
            groups: self.groups.clone(),
            images: self.images.clone(),
            commit_data: self.commit_data.clone(),
        }
    }
}

#[derive(Debug, Clone, SimpleObject)]
pub struct InternUploadSessionGQLObject {
    pub manga_id: Uuid,
    pub groups: Vec<Uuid>,
    pub images: Vec<String>,
    pub commit_data: Option<InternUploadSessionCommitData>,
}

#[derive(Debug, Clone, Default)]
pub struct UploadSessions(ArcRwLock<BTreeMap<Uuid, InternUploadSession>>);

impl Deref for UploadSessions {
    type Target = ArcRwLock<BTreeMap<Uuid, InternUploadSession>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
