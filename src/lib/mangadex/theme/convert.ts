import type { MangaDexTheme, MangaDexThemeInput } from "@mangadex/gql/graphql";
import type { MangadexTheme as IMangaDexTheme } from "./index";

export function IThemeToGqlThemeInput(theme: IMangaDexTheme): MangaDexThemeInput {
    return {
        accents: theme.accents,
        button: theme.button,
        midTone: theme.mid_tone,
        contrast: theme.contrast,
        textColor: theme.textColor,
        mainBackground: theme.mainBackground,
        scrollbar: theme.scrollbar,
        primary: theme.primary,
        status: theme.status,
        indication: theme.indication,
        danger: theme.danger
    }
}

export function GqlThemeToITheme(theme: MangaDexTheme): IMangaDexTheme {
    return {
        accents: theme.accents,
        button: theme.button,
        mid_tone: theme.midTone,
        contrast: theme.contrast,
        textColor: theme.textColor,
        mainBackground: theme.mainBackground,
        scrollbar: theme.scrollbar,
        primary: theme.primary,
        status: theme.status,
        indication: theme.indication,
        danger: theme.danger
    }
}
