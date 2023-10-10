import { Alt_title } from "@mangadex/api/internal/Utils";
import Manga from "@mangadex/api/structures/Manga";
import { motion } from "framer-motion";
import React from "react";

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
    if(src instanceof Manga){
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
    }else{
        throw new Error("The given src is not a manga");
    }
    
}

export default function MangaTitle(props: {
    src: Manga
}) {
    const title = useMangaTitle(props);
    return (
        <motion.span layoutId={`manga-title-${props.src.get_id()}`}>{title}</motion.span>
    );
}