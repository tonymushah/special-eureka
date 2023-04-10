import React from "react";
import { useManga } from ".";
import { Manga } from "../../api/structures/Manga";
import { Top_Chaps } from "../../resources/componnents/mangas/Mainpage/Top_chap";

export default function Chapters_() {
    const toUse: Manga = useManga().toUse;
    return (
        <Top_Chaps src={toUse}></Top_Chaps>
    );
}