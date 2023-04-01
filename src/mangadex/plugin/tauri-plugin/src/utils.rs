use once_cell::sync::OnceCell;
use std::io::Result;
static mut INDENTIFIER : OnceCell<String> = OnceCell::new();

pub fn set_indentifier(identifier: String) -> Result<()>{
  match std::thread::spawn(move|| -> Result<()> {
    unsafe{
      match INDENTIFIER.set(identifier) {
      Ok(_) => return Ok(()),
      Err(_) => {
        return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, "The identifier already setted"));
      }
    }
    }
  }).join(){
    Ok(res) => res,
    Err(_) => Err(std::io::Error::new(std::io::ErrorKind::Other, "Error on loading notification handle"))
  }
}

pub fn get_indentifier() -> Result<&'static String>{
  let data_: &'static String;
  unsafe{
    match INDENTIFIER.get(){
      None => return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "Identifier not found")),
      Some(data) => {
        data_ = data;
      }
    }
  }
  Ok(data_)
}

pub fn get_notification_handle_mut() -> Result<&'static mut String>{
  let data_: &'static mut String;
  unsafe{
    match INDENTIFIER.get_mut(){
      None => return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "Identifier not found")),
      Some(data) => {
        data_ = data;
      }
    }
  }
  Ok(data_)
}
