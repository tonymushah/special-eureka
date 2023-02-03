import React from "react";
import { useManga } from ".";
import { Manga } from "../../api/structures/Manga";
import { Covers_Manga } from "../../resources/componnents/mangas/Mainpage/Covers_";

export default function Covers_() {
    let toUse: Manga = useManga().toUse;
    return (
        <Covers_Manga src={toUse}></Covers_Manga>
    )
}