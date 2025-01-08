use std::num::TryFromIntError;

use mangadex_api_schema_rust::v5::Results;
use serde::{Deserialize, Serialize};
use tokio_stream::{Stream, StreamExt};

#[derive(Clone, Serialize)]
pub struct Collection<T>
where
    T: Serialize,
    T: Clone,
{
    data: Vec<T>,
    limit: usize,
    offset: usize,
    total: usize,
}

impl<T> Collection<T>
where
    T: Serialize,
    T: Clone,
{
    pub fn new(to_use: &[T], limit: usize, offset: usize) -> crate::Result<Collection<T>> {
        if offset > to_use.len() {
            Err(crate::error::Error::Io(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                "the offset is greater than the vector length",
            )))
        } else {
            let (_, right) = to_use.split_at(offset);
            let data;
            if right.len() <= limit {
                data = right.to_vec();
                Ok(Collection {
                    data,
                    limit,
                    offset,
                    total: to_use.len(),
                })
            } else {
                let (left1, _) = right.split_at(limit);
                data = left1.to_vec();
                Ok(Collection {
                    data,
                    limit,
                    offset,
                    total: to_use.len(),
                })
            }
        }
    }
    pub fn get_data(&self) -> &Vec<T> {
        &self.data
    }
    pub fn get_data_mut(&mut self) -> &mut Vec<T> {
        &mut self.data
    }
    pub fn get_total(&self) -> usize {
        self.total
    }
    pub fn get_offset(&self) -> usize {
        self.offset
    }
    pub fn get_limit(&self) -> usize {
        self.limit
    }
    pub fn convert_to<S, F>(self, f: F) -> crate::Result<Collection<S>>
    where
        F: Fn(T) -> S,
        S: Clone,
        S: serde::Serialize,
    {
        Ok(Collection {
            data: self.data.into_iter().map(f).collect(),
            offset: self.offset,
            limit: self.limit,
            total: self.total,
        })
    }
    pub async fn from_async_stream<S>(stream: S, limit: usize, offset: usize) -> Collection<T>
    where
        S: Stream<Item = T>,
    {
        tokio::pin!(stream);

        let (total, data) = stream
            .fold((0usize, Vec::<T>::new()), |(size, mut data), inner| {
                if size >= offset && size < offset + limit {
                    data.push(inner);
                }
                (size + 1, data)
            })
            .await;
        Self {
            data,
            limit,
            offset,
            total: total + 1,
        }
    }
}

impl<'de, T> TryFrom<Collection<T>> for Results<T>
where
    T: Serialize + Deserialize<'de> + Clone,
{
    type Error = TryFromIntError;
    fn try_from(value: Collection<T>) -> Result<Self, Self::Error> {
        Ok(Self {
            result: mangadex_api_types_rust::ResultType::Ok,
            response: mangadex_api_types_rust::ResponseType::Collection,
            data: value.data,
            limit: value.limit.try_into()?,
            offset: value.offset.try_into()?,
            total: value.total.try_into()?,
        })
    }
}
