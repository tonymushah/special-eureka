import React from "react";
import { useManga } from "..";
import Manga from "@mangadex/api/structures/Manga";
import { Covers_Manga } from "@mangadex/resources/componnents/mangas/Mainpage/Covers_";


export function InnertOnSuccess() {
    const toUse: Manga = useManga().toUse;
    return (
        <Covers_Manga src={toUse} />
    );
}
