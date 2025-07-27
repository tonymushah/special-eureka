pub mod chapter;
pub mod cover;
pub mod manga;

const CHANNEL_SIZE: usize = 100;

#[derive(Debug, actix::Message)]
#[rtype(result = "()")]
struct OfflineAppStateNotLoadedMsg;

enum SharedState<T> {
    Task(T),
    OfflineAppStateNotLoaded,
}
