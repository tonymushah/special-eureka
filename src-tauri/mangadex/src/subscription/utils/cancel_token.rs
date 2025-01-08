use tauri::{EventHandler, Runtime, Window, WindowEvent};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

#[derive(Debug)]
pub struct WindowCancellationToken<R>
where
    R: Runtime,
{
    window: Window<R>,
    cancel_token: CancellationToken,
    sub_id_handler: EventHandler,
    sub_id: Uuid,
}

impl<R: Runtime> WindowCancellationToken<R> {
    pub fn new(window: Window<R>, sub_id: Uuid) -> Self {
        let cancel_token = CancellationToken::new();
        {
            let window_event_cancel_token = cancel_token.clone();
            window.on_window_event(move |e| {
                if let WindowEvent::Destroyed = e {
                    // println!("Destroyed");
                    window_event_cancel_token.cancel();
                }
            });
        }
        let sub_id_handler = {
            let window_event_cancel_token = cancel_token.clone();
            window.listen("sub_end", move |e| {
                if let Some(id) =
                    e.payload()
                        .map(|p| p.trim().replace('\"', ""))
                        .and_then(|payload| {
                            Uuid::parse_str(&payload)
                                /*
                                    .map_err(|er| {
                                        #[cfg(debug_assertions)]
                                        eprintln!("{:#?}", er);
                                        er
                                    })
                                */
                                .ok()
                        })
                {
                    if id == sub_id {
                        // println!("sub_end");
                        window_event_cancel_token.cancel();
                    }
                }
            })
        };
        Self {
            window,
            cancel_token,
            sub_id_handler,
            sub_id,
        }
    }
    pub fn cancel_token(&self) -> CancellationToken {
        self.cancel_token.clone()
    }
    pub fn window(&self) -> &Window<R> {
        &self.window
    }
    pub fn sub_id(&self) -> Uuid {
        self.sub_id
    }
}

impl<R: Runtime> Drop for WindowCancellationToken<R> {
    fn drop(&mut self) {
        self.window.unlisten(self.sub_id_handler);
    }
}

impl<R: Runtime> Clone for WindowCancellationToken<R> {
    fn clone(&self) -> Self {
        Self::new(self.window.clone(), self.sub_id)
    }
}
