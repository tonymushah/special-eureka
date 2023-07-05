import React from "react";
import { Alt_title } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";

export function useMangaAltTitle({ src }: {
    src: Manga
}) {
    return React.useMemo(() => {
        return new Alt_title(src.get_alt_title()).get_random_lang();
    }, [src]);
}

export function useMangaTitle({ src }: {
    src: Manga
}): string {
    return React.useMemo(() => {
        if (src.get_title() != undefined) {
            if (src.get_title().en == null) {
                return new Alt_title(src.get_alt_title()).get_quicklang()!;
            } else {
                return src.get_title().en;
            }
        } else {
            return new Alt_title(src.get_alt_title()).get_random_lang()!;
        }
    }, [src]);
}

export default function MangaTitle(props: {
    src: Manga
}) {
    const title = useMangaTitle(props);
    return (
        <React.Fragment>{title}</React.Fragment>
    );
}