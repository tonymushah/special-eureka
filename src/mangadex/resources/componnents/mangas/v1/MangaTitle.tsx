import React from "react";
import { Alt_title } from "../../../../api/internal/Utils";
import { Manga } from "../../../../api/structures/Manga";

export default function MangaTitle(props: {
    src : Manga
}){
    let title : string;
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
    return (
        <>{title}</>
    )
}