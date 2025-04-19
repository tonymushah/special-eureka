pub mod author;
pub mod chapter;
pub mod cover;
pub mod followed_manga_feed;
pub mod manga;
pub mod scanlation_group;

use std::future::Future;

use mangadex_api::MangaDexClient;
use mangadex_api_schema_rust::v5::Results;
use uuid::Uuid;

use crate::constants::MANGADEX_PAGE_LIMIT;

use super::math::divide::divide;

pub trait SplittableParam: Clone {
    fn offset(&self) -> u32;
    fn limit(&self) -> u32;
    fn ids(&self) -> &[Uuid] {
        &[]
    }
    fn set_offset(&mut self, offset: u32);
    fn set_limit(&mut self, limit: u32);
    fn set_ids(&mut self, _ids: Vec<Uuid>) {}
    fn split_param(&self, chunck: usize) -> Result<Vec<Self>, std::num::TryFromIntError> {
        let res = if !self.ids().is_empty() {
            self.ids()
                .chunks(chunck)
                .flat_map(|chunck| {
                    let mut param = self.clone();
                    param.set_ids(chunck.to_vec());

                    if param.limit() == 0 && !param.ids().is_empty() {
                        param.set_limit(param.ids().len().try_into().ok()?);
                    }
                    Some(param)
                })
                .collect::<Vec<_>>()
        } else {
            let div_res = divide(self.limit(), chunck.try_into()?);
            let mut all = (0..div_res.quot)
                .map(|d| {
                    let mut param = self.clone();
                    param
                        .set_offset(self.offset() + d * <usize as TryInto<u32>>::try_into(chunck)?);
                    param.set_limit(chunck.try_into()?);
                    Ok(param)
                })
                .collect::<Result<Vec<_>, std::num::TryFromIntError>>()?;
            all.push({
                let mut param = self.clone();
                param.set_offset(
                    param.offset() + div_res.quot * <usize as TryInto<u32>>::try_into(chunck)?,
                );
                param.set_limit(div_res.remainder);
                param
            });
            all
        };
        Ok(res)
    }
    fn split_param_default(&self) -> Result<Vec<Self>, std::num::TryFromIntError> {
        self.split_param(MANGADEX_PAGE_LIMIT.try_into()?)
    }
}

pub trait SendableParam: Sync + Send {
    type Item: Send;
    fn send(
        self,
        client: &MangaDexClient,
    ) -> impl Future<Output = crate::Result<Results<Self::Item>>> + Send;
}

pub trait SendSplitted: SendableParam + SplittableParam {
    fn send_splitted(
        self,
        client: &MangaDexClient,
        chunck: usize,
    ) -> impl Future<Output = crate::Result<Results<<Self as SendableParam>::Item>>> + Send {
        async move {
            let params = self.split_param(chunck)?;
            let mut results = Vec::<Results<<Self as SendableParam>::Item>>::new();
            for val in params {
                results.push(val.send(client).await?);
            }
            Ok(results.into_iter().fold(
                Results {
                    response: mangadex_api_types_rust::ResponseType::Collection,
                    offset: self.offset(),
                    total: 0,
                    limit: 0,
                    data: Vec::new(),
                    result: mangadex_api_types_rust::ResultType::Ok,
                },
                |mut agg, mut res| {
                    agg.total = res.total;
                    agg.limit += res.limit;
                    agg.data.append(&mut res.data);
                    agg
                },
            ))
        }
    }
    fn send_splitted_default(
        self,
        client: &MangaDexClient,
    ) -> impl Future<Output = crate::Result<Results<<Self as SendableParam>::Item>>> + Send {
        async move {
            self.send_splitted(client, MANGADEX_PAGE_LIMIT.try_into()?)
                .await
        }
    }
}

impl<P> SendSplitted for P where P: SendableParam + SplittableParam {}
