use async_graphql::{InputObject, SimpleObject};
use serde::{Deserialize, Serialize};

pub mod profiles;

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "AccentInput")]
pub struct Accent {
    pub default: String,
    pub hover: String,
    pub active: String,
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "PrimaryColorInput")]
pub struct PrimaryColor {
    pub primary: String,
    pub primary1: String,
    pub primary2: String,
}

impl Default for PrimaryColor {
    fn default() -> Self {
        Self {
            primary: "#ff00c0".into(),
            primary1: "#ff18d8".into(),
            primary2: "#dd00c0".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "StatusColorInput")]
pub struct StatusColor {
    pub red: String,
    pub green: String,
    pub yellow: String,
    pub blue: String,
    pub grey: String,
    pub purple: String,
}

impl Default for StatusColor {
    fn default() -> Self {
        Self {
            red: "#ff4040".into(),
            green: "#04d000".into(),
            yellow: "#eeff00".into(),
            blue: "#00c9f5".into(),
            grey: "#9d9d9d".into(),
            purple: "#7d40ff".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "IndicatorColorInput")]
pub struct IndicatorColor {
    pub blue: String,
}

impl Default for IndicatorColor {
    fn default() -> Self {
        Self {
            blue: "#4b98f1".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "DangerColorInput")]
pub struct DangerColor {
    pub default: String,
    pub l1: String,
    pub l2: String,
}

impl Default for DangerColor {
    fn default() -> Self {
        Self {
            default: "#ff4040".into(),
            l1: "#db3131".into(),
            l2: "#bf2121".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "ButtonAccentInput")]
pub struct ButtonAccentColor {
    pub default: String,
    pub alternate: String,
}

impl Default for ButtonAccentColor {
    fn default() -> Self {
        Self {
            default: "#4f4f4f".into(),
            alternate: "#2c2c2c".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "ScrollbarColorInput")]
pub struct ScrollbarColor {
    pub default: String,
    pub hovered: String,
}

impl Default for ScrollbarColor {
    fn default() -> Self {
        Self {
            default: "#4f4f4f".into(),
            hovered: "#585858".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "AccentsInput")]
pub struct Accents {
    pub default: Accent,
    pub l1: Accent,
    pub l2: Accent,
    pub l3: Accent,
    pub l4: Accent,
    pub l5: Accent,
}

impl Default for Accents {
    fn default() -> Self {
        Self {
            default: Accent {
                default: "#2c2c2c".into(),
                hover: "#393939".into(),
                active: "#1d1d1d".into(),
            },
            l1: Accent {
                default: "#3d3d3d".into(),
                hover: "#494949".into(),
                active: "#272727".into(),
            },
            l2: Accent {
                default: "#4f4f4f".into(),
                hover: "#686868".into(),
                active: "#222222".into(),
            },
            l3: Accent {
                default: "#585858".into(),
                hover: "#707070".into(),
                active: "#3e3e3e".into(),
            },
            l4: Accent {
                default: "#5d5d5d".into(),
                hover: "#686868".into(),
                active: "#373737".into(),
            },
            l5: Accent {
                default: "#666666".into(),
                hover: "#797979".into(),
                active: "#3b3b3b".into(),
            },
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "ContrastInput")]
pub struct Contrast {
    pub l1: String,
}

impl Default for Contrast {
    fn default() -> Self {
        Self {
            l1: "#4f4f4f".into(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, SimpleObject, InputObject)]
#[graphql(input_name = "MangaDexThemeInput")]
pub struct MangaDexTheme {
    pub text_color: String,
    pub main_background: String,
    pub accents: Accents,
    pub mid_tone: String,
    pub contrast: Contrast,
    pub scrollbar: ScrollbarColor,
    pub button: ButtonAccentColor,
    pub primary: PrimaryColor,
    pub status: StatusColor,
    pub indication: IndicatorColor,
    pub danger: DangerColor,
}

impl Default for MangaDexTheme {
    fn default() -> Self {
        Self {
            text_color: "#ffffff".into(),
            main_background: "#191a1c".into(),
            accents: Default::default(),
            mid_tone: "#8c8c8c".into(),
            contrast: Default::default(),
            scrollbar: Default::default(),
            button: Default::default(),
            primary: Default::default(),
            status: Default::default(),
            indication: Default::default(),
            danger: Default::default(),
        }
    }
}
