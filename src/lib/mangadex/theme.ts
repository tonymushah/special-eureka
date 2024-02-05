export type Accent = {
    default: string,
    hover: string,
    active: string
}

export type PrimaryColor = {
    primary: string,
    primary1: string,
    primary2: string,
}

export type StatusColor = {
    red: string,
    green: string,
    yellow: string,
    blue: string,
    grey: string,
    purple: string,
}

export type IndicatorColor = {
    blue: string
}

export type DangerColor = {
    default: string,
    l1: string,
    l2: string
}

export type ButtonAccentColor = {
    default: string,
    alternate: string
}

export type ScrollbarColor = {
    default: string,
    hovered: string
}

export type Accents = {
    default: Accent,
    l1: Accent,
    l2: Accent,
    l3: Accent,
    l4: Accent,
    l5: Accent
}

export type Contrast = {
    l1: string
}

export type MangadexTheme = {
    textColor: string,
    mainBackground: string,
    accents: Accents,
    mid_tone: string,
    contrast: Contrast,
    scrollbar: ScrollbarColor,
    button: ButtonAccentColor,
    primary: PrimaryColor,
    status: StatusColor,
    indication: IndicatorColor,
    danger: DangerColor
}

export const custom: MangadexTheme = {
    textColor: "#ffffff",
    mainBackground: "#191a1c",
    accents: {
        default: {
            default: "#2c2c2c",
            hover: "#393939",
            active: "#1d1d1d"
        },
        l1: {
            default: "#3d3d3d",
            hover: "#494949",
            active: "#272727"
        },
        l2: {
            default: "#4f4f4f",
            hover: "#686868",
            active: "#222222"
        },
        l3: {
            default: "#585858",
            hover: "#707070",
            active: "#3e3e3e"
        },
        l4: {
            default: "#5d5d5d",
            hover: "#686868",
            active: "#373737"
        },
        l5: {
            default: "#666666",
            hover: "#797979",
            active: "#3b3b3b"
        }
    },
    mid_tone: "#8c8c8c",
    contrast: {
        l1: "#4f4f4f"
    },
    scrollbar: {
        default: "#4f4f4f",
        hovered: "#585858"
    },
    button: {
        default: "#4f4f4f",
        alternate: "#2c2c2c"
    },
    primary: {
        primary: "#ff00c0",
        primary1: "#ff18d8",
        primary2: "#dd00c0"
    },
    status: {
        red: "#ff4040",
        green: "#04d000",
        yellow: "#eeff00",
        blue: "#00c9f5",
        grey: "#9d9d9d",
        purple: "#7d40ff"
    },
    indication: {
        blue: "#4b98f1"
    },
    danger: {
        default: "#ff4040",
        l1: "#db3131",
        l2: "#bf2121"
    }
}