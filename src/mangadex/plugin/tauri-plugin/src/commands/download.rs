use mangadex_desktop_api2::settings::server_options::ServerOptions;

use crate::ins_handle::{add_in_chapter_failed, add_in_chapter_queue, add_in_chapter_success};
use crate::{Error, this_eureka_reqwest_result};
use crate::Result;
use crate::ErrorPayload;

#[tauri::command]
pub async fn download_manga(manga_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/manga/{}",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn update_cover_data(cover_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/cover/{}",
        server_option.hostname, server_option.port, cover_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn download_cover(cover_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/cover/{}",
        server_option.hostname, server_option.port, cover_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn download_cover_with_quality(cover_id: String, quality: u32) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/cover/{}/{}",
        server_option.hostname, server_option.port, cover_id, quality
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

pub async fn download_chapter_normal_func(chapter_id: String) -> Result<String>{
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/chapter/{}/data",
        server_option.hostname, server_option.port, chapter_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            add_in_chapter_failed(chapter_id)?;
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)    
}

#[tauri::command]
pub async fn download_chapter(chapter_id: String) -> Result<String> {
    Ok(download_chapter_normal_mode(chapter_id).await?)
}

#[tauri::command]
pub async fn download_chapter_normal_mode(chapter_id: String) -> Result<String> {
    let chap_id_ = chapter_id.clone();
    let chap_id__ = chapter_id.clone();
    add_in_chapter_queue(chap_id_)?;
    match download_chapter_normal_func(chapter_id).await {
        Ok(data) => {
            add_in_chapter_success(chap_id__)?;
            return Ok(data);
        },
        Err(err) => {
            add_in_chapter_failed(chap_id__)?;
            return Err(err);
        }
    }
}

#[tauri::command]
pub async fn download_chapter_data_saver_mode(chapter_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/chapter/{}/data-saver",
        server_option.hostname, server_option.port, chapter_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn download_manga_cover(manga_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/manga/{}/cover",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn download_manga_covers(manga_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/manga/{}/covers",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn refetch_all_manga() -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/chapter/all/patch-manga",
        server_option.hostname, server_option.port
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
pub async fn patch_all_manga_cover() -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/mangas/all/cover",
        server_option.hostname, server_option.port
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}
