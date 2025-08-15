use std::{hash::Hash, num::NonZero, time::Duration};

use duration_string::DurationString;
use governor::Jitter;
use governor::Quota;
use governor::{DefaultDirectRateLimiter, DefaultKeyedRateLimiter};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct SpecificRateLimitConfigEntry {
    pub num: NonZero<u32>,
    pub duration: DurationString,
}

impl From<&SpecificRateLimitConfigEntry> for Quota {
    fn from(value: &SpecificRateLimitConfigEntry) -> Self {
        Self::with_period(*value.duration)
            .unwrap_or(Self::per_minute(NonZero::new(5).unwrap()))
            .allow_burst(value.num)
    }
}

impl From<SpecificRateLimitConfigEntry> for Quota {
    fn from(value: SpecificRateLimitConfigEntry) -> Self {
        (&value).into()
    }
}

#[derive(Clone, Copy, Debug, PartialEq, PartialOrd, Eq, Ord, Hash)]
pub struct NoKey;

type RateLimiter<K = NoKey> = DefaultKeyedRateLimiter<K>;

macro_rules! specific {
    ($($name:ident $([$key:ty])? = {$num:expr, $period:expr}, )*) => {
        #[derive(Debug, Clone, Deserialize)]
        #[serde(default)]
        pub struct SpecificRateLimitConfig {
            $(
                pub $name: SpecificRateLimitConfigEntry,
            )*
        }

        impl Default for SpecificRateLimitConfig {
            fn default() -> Self {
                Self {
                    $(
                        $name: SpecificRateLimitConfigEntry {
                            num: $num,
                            duration: $period
                        },
                    )*
                }
            }
        }

        pub struct SpecificRateLimits {
            $(
                pub $name: RateLimiter$(<$key>)?,
            )*
        }

        impl SpecificRateLimits {
            $(
				specific!(@imp $name $($key)?);
            )*
        }

        impl From<&SpecificRateLimitConfig> for SpecificRateLimits {
            fn from(value: &SpecificRateLimitConfig) -> Self {
                Self {
                    $(
                        $name: RateLimiter$(::<$key>)?::keyed((&value.$name).into()),
                    )*
                }
            }
        }

        impl From<SpecificRateLimitConfig> for SpecificRateLimits {
            fn from(value: SpecificRateLimitConfig) -> Self {
                Self {
                    $(
                        $name: RateLimiter$(::<$key>)?::keyed(value.$name.into()),
                    )*
                }
            }
        }
    };
	(@imp $name:ident) => {
		pub async fn $name(&self) {
			until_no_key_ready(&self.$name).await
		}
	};
	(@imp $name:ident $key:ty) => {
		pub async fn $name(&self, key: &$key) {
			until_key_ready(&self.$name, key).await
		}
	};
}

specific! {
    // AtHome
    at_home [uuid::Uuid] = {
        NonZero::new(40).unwrap(),
        Duration::from_secs(60).into()
    },
    // Authentication
    login = {
        NonZero::new(30).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    refresh = {
        NonZero::new(60).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    // Author
    post_author = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    put_author = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_author = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Captcha (reCaptcha)
    solve_captcha = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Cover
    post_cover = {
        NonZero::new(100).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    put_cover = {
        NonZero::new(100).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    delete_cover = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Chapter
    read_chapter = {
        NonZero::new(300).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    put_chapter = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_chapter = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    // Forums
    post_thread = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    // Manga
    post_manga = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    put_manga = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    delete_manga = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    commit_manga_draft = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    random_manga = {
        NonZero::new(60).unwrap(),
        Duration::from_secs(60).into()
    },
    // Reports
    post_report = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    get_report = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    // Scanlation Group
    post_group = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    put_group = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_group = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Upload
    // -> Sessions
    get_upload = {
        NonZero::new(30).unwrap(),
        Duration::from_secs(60).into()
    },
    begin_upload = {
        NonZero::new(20).unwrap(),
        Duration::from_secs(60).into()
    },
    commit_upload = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_upload = {
        NonZero::new(30).unwrap(),
        Duration::from_secs(60).into()
    },
    // -> Files
    upload_files = {
        NonZero::new(250).unwrap(),
        Duration::from_secs(60).into()
    },
}

pub fn default_jitter() -> Jitter {
    Jitter::new(Duration::from_millis(500), Duration::from_secs(2))
}

pub async fn until_ready(rate_limiter: &DefaultDirectRateLimiter) {
    rate_limiter.until_ready_with_jitter(default_jitter()).await;
}

pub async fn until_key_ready<K>(rate_limiter: &DefaultKeyedRateLimiter<K>, key: &K)
where
    K: Eq + Hash + Clone,
{
    rate_limiter
        .until_key_ready_with_jitter(key, default_jitter())
        .await
}

async fn until_no_key_ready(rate_limiter: &RateLimiter) {
    rate_limiter
        .until_key_ready_with_jitter(&NoKey, default_jitter())
        .await
}
