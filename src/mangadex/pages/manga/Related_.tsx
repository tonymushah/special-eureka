import React from "react";
import { useManga } from ".";
import { Manga } from "../../api/structures/Manga";
import Related from "../../resources/componnents/mangas/Mainpage/Related";

export default function Related_() {
    const toUse: Manga = useManga().toUse;
    return (
        <Related src={toUse} />
    );
}