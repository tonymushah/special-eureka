use std::{error::Error, io, thread::JoinHandle};

use actix::System;
use tokio::runtime::{Handle, Runtime};

pub struct RuntimeGuard {
    handle: Handle,
    sys: System,
    jhandle: Option<JoinHandle<io::Result<()>>>,
}

impl Drop for RuntimeGuard {
    fn drop(&mut self) {
        self.sys.stop();
    }
}

impl RuntimeGuard {
    pub fn handle(&self) -> &Handle {
        &self.handle
    }
    pub fn sys(&self) -> &System {
        &self.sys
    }
    pub fn cleanup(mut self) -> Result<(), Box<dyn Error>> {
        let Self {
            handle: _,
            ref sys,
            ref mut jhandle,
        } = self;
        sys.stop();
        if let Some(j) = jhandle.take() {
            j.join().map_err(|e| {
                let err = *e
                    .downcast::<String>()
                    .unwrap_or(Box::new(String::from("Unexpected Error")));
                io::Error::other(err)
            })??
        }

        Ok(())
    }
    pub fn new<F>(factory: F) -> Result<Self, Box<dyn Error>>
    where
        F: FnOnce() -> Runtime + Send + 'static,
    {
        let (rx, tx) = std::sync::mpsc::channel::<(Handle, System)>();
        let runtime_join = std::thread::spawn(move || {
            let sys_run = System::with_tokio_rt(factory);
            let _ = rx.send((
                sys_run.runtime().tokio_runtime().handle().clone(),
                System::current(),
            ));
            sys_run.run()
        });
        let (run, sys) = tx.recv()?;
        Ok(Self {
            handle: run,
            sys,
            jhandle: Some(runtime_join),
        })
    }
}
