use std::cmp::Ordering;

use regex::Regex;

pub fn sort_by_filenames(mut files: Vec<String>) -> Result<Vec<String>, regex::Error> {
    let regex = Regex::new(r"\d+")?;
    let rs = |a: &String, b: &String| -> Option<(u32, u32)> {
        Some((
            regex.captures(a)?.get(0)?.as_str().parse::<u32>().ok()?,
            regex.captures(b)?.get(0)?.as_str().parse::<u32>().ok()?,
        ))
    };

    files.sort_by(|a, b| {
        if let Some((a_p, b_p)) = rs(a, b) {
            a_p.cmp(&b_p)
        } else {
            Ordering::Equal
        }
    });
    Ok(files)
}
