use tokio::task::AbortHandle;

pub struct AbortHandleGuard(Option<AbortHandle>);

impl AbortHandleGuard {
    pub fn new(abort: AbortHandle) -> Self {
        AbortHandleGuard(Some(abort))
    }
    pub fn unarm(mut self) -> Option<AbortHandle> {
        self.0.take()
    }
}

impl Drop for AbortHandleGuard {
    fn drop(&mut self) {
        if let Some(handle) = self.0.take() {
            handle.abort();
        }
    }
}
