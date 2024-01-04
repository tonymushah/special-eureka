pub mod api_client;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod manga;
pub mod read_marker;
pub mod scanalation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;

pub type SendDataResult = Result<(), String>;

pub trait SendData<T>
where
    T: Sync + Sized + Clone + Send,
{
    fn send_data(&self, data: T) -> SendDataResult;
}
