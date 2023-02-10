use std::io::Result;

#[derive(Clone)]
pub struct Download_Entry<T: Clone + PartialEq>{
    queue : Vec<T>,
    success : Vec<T>,
    failed : Vec<T>
}
impl<T: Clone + PartialEq> Download_Entry<T>{
    pub fn new() -> Self{
        return Self { 
            queue: Vec::new(), 
            success: Vec::new(), 
            failed: Vec::new() 
        }
    }
    pub fn get_queue(self) -> Vec<T>{
        self.queue
    }
    pub fn get_queue_ref(&self) -> &Vec<T>{
        &self.queue
    }
    pub fn get_success(self) -> Vec<T>{
        self.success
    }
    pub fn get_success_ref(&self) -> &Vec<T>{
        &self.success
    }
    pub fn get_failed(self) -> Vec<T>{
        self.failed
    }
    pub fn get_failed_ref(&self) -> &Vec<T>{
        &self.failed
    }
    pub fn get_failed_len(&self) -> usize {
        self.failed.len()
    }
    pub fn get_success_len(&self) -> usize {
        self.success.len()
    }
    pub fn get_queue_len(&self) -> usize {
        self.queue.len()
    }
    pub fn get_finished_len(&self) -> usize {
        self.get_failed_len() + self.get_success_len()
    }
    pub fn add_in_queue(&mut self, to_insert: T) -> Result<()>{
        if self.queue.contains(&to_insert) {
            return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, "The value to insert is alredy in queue"));
        }else{
            self.queue.push(to_insert);
        }
        Ok(())
    }
    pub fn add_in_failed(&mut self, to_insert: T) -> Result<()>{
        if self.queue.contains(&to_insert) == false{
            return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "The value to insert is'nt in queue"));
        }else if self.failed.contains(&to_insert){
            return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, "The value to insert is alredy in failed"));
        }else{
            self.failed.push(to_insert);
        }
        Ok(())
    }
    pub fn add_in_success(&mut self, to_insert: T) -> Result<()>{
        if self.queue.contains(&to_insert) == false{
            return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "The value to insert is'nt in queue"));
        }else if self.success.contains(&to_insert){
            return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, "The value to insert is alredy in success"));
        }else{
            self.success.push(to_insert);
        }
        Ok(())
    }
    pub fn is_all_finished(&mut self) -> bool {
        if self.get_finished_len() == 0 && self.get_queue_len() == 0 {
            false
        }else{
            self.get_finished_len() >= self.get_queue_len()
        }
    }
}