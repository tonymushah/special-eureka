use std::{cmp::Ordering, path::PathBuf};

use regex::Regex;
use url::Url;

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

pub(super) fn sort_couple(
    mut files: Vec<(Url, PathBuf)>,
) -> Result<Vec<(Url, PathBuf)>, regex::Error> {
    let regex = Regex::new(r"\d+")?;
    let rs = |(_, a): &(Url, PathBuf), (_, b): &(Url, PathBuf)| -> Option<(u32, u32)> {
        let a = a.file_name().and_then(|d| d.to_str().map(String::from))?;
        let b = b.file_name().and_then(|d| d.to_str().map(String::from))?;
        Some((
            regex.captures(&a)?.get(0)?.as_str().parse::<u32>().ok()?,
            regex.captures(&b)?.get(0)?.as_str().parse::<u32>().ok()?,
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

#[cfg(test)]
mod test {
    #[test]
    fn test() {
        let to_use: Vec<String> = vec!["12".into(), "1".into(), "2-d".into(), "d3".into()];
        let sorted: Vec<String> = vec!["1".into(), "2-d".into(), "d3".into(), "12".into()];
        assert_eq!(sorted, super::sort_by_filenames(to_use).unwrap());
    }
}
