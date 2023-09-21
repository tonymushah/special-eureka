use once_cell::sync::OnceCell;
use std::thread::JoinHandle;
use crate::intelligent_notification_system::DownloadEntry;
use tauri::api::notification::Notification;
use crate::utils::get_indentifier;
use crate::Error;
use crate::Result;

static mut INS_CHAPTER: OnceCell<DownloadEntry<String>> = OnceCell::new();

static mut INS_CHAPTER_CHECKER: OnceCell<JoinHandle<()>> = OnceCell::new();

pub fn set_ins_chapter_checker_handle(joinhandle: JoinHandle<()>) -> Result<()> {
    match std::thread::spawn(move || -> Result<()> {
        unsafe {
            match INS_CHAPTER_CHECKER.set(joinhandle) {
                Ok(_) => return Ok(()),
                Err(_) => {
                    return Err(Error::Io(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The ins chapter checker handle already setted",
                    )));
                }
            }
        }
    })
    .join()
    {
        Ok(res) => res,
        Err(_) => Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Error on loading the ins chapter checker",
        ))),
    }
}

pub fn get_ins_checker_handle() -> Result<&'static JoinHandle<()>> {
    let data_: &'static JoinHandle<()>;
    unsafe {
        match INS_CHAPTER_CHECKER.get() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS Chapter checker handle not found",
                )))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub fn init_ins_chapter_handle() -> Result<()> {
    match std::thread::spawn(move || -> Result<()> {
        unsafe {
            match INS_CHAPTER.set(DownloadEntry::new()) {
                Ok(_) => return Ok(()),
                Err(_) => Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::AlreadyExists,
                    "The ins chapter handle already setted",
                ))),
            }
        }
    })
    .join()
    {
        Ok(res) => res,
        Err(_) => Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Something inexecpeted happens when initializing the INS Handler",
        ))),
    }
}

pub fn get_ins_handle() -> Result<&'static DownloadEntry<String>> {
    let data_: &'static DownloadEntry<String>;
    unsafe {
        match INS_CHAPTER.get() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS CHAPTER handle not found",
                )))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub fn get_ins_handle_mut() -> Result<&'static mut DownloadEntry<String>> {
    let data_: &'static mut DownloadEntry<String>;
    unsafe {
        match INS_CHAPTER.get_mut() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS CHAPTER handle not found",
                )))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub fn reset_ins_handle() -> Result<()> {
    unsafe {
        match INS_CHAPTER.take() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS CHAPTER handle not found",
                )))
            }
            Some(_) => (),
        }
    }
    init_ins_chapter_handle()?;
    Ok(())
}

pub fn add_in_chapter_queue(id: String) -> Result<()> {
    let handle = get_ins_handle_mut()?;
    handle.add_in_queue(id)?;
    Ok(())
}

pub fn add_in_chapter_success(id: String) -> Result<()> {
    let handle = get_ins_handle_mut()?;
    handle.add_in_success(id)?;
    Ok(())
}

pub fn add_in_chapter_failed(id: String) -> Result<()> {
    let handle = get_ins_handle_mut()?;
    handle.add_in_failed(id)?;
    Ok(())
}

pub fn check_if_ins_finished() -> Result<bool> {
    let handle = get_ins_handle_mut()?;
    if handle.is_empty() == true{
        return Ok(false);
    }
    Ok(handle.is_all_finished())
}

pub fn check_plus_notify() -> Result<()> {
    
    let check_ = check_if_ins_finished()?;
    let ins_chapter = get_ins_handle_mut()?;
    let identifier = get_indentifier()?;
    let identifier = format!("{}", identifier);
    let notification_handle = Notification::new(identifier);
    if check_ == true {
        match notification_handle
            .title("Chapter download finished")
            .body(format!("Success {} \n Failed {}", ins_chapter.get_success_len(), ins_chapter.get_failed_len()))
            .show(){
                Ok(_) => (),
                Err(error) => {
                    println!("{}", error.to_string());
                }
            }
        reset_ins_handle()?;
    }
    Ok(())
}
