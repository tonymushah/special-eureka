import React from "react";
import { useQuery } from "react-query";
import { Manga } from "../../../../api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementFallback from "./MangaElementFallback";
import MangaVerticalElement from "./MangaVerticalElement";

export default function MangaVerticalElement_wID(props : {
    mangaID: string
}){
    const query = useQuery<Manga>("mdx-manga:" + props.mangaID, () => {
        return Manga.getMangaByID(props.mangaID)
    });
    if (query.isLoading) {
        return(
            <MangaElementFallback/>
        )
    }
    if(query.isError){
        return(
            <ErrorEL1 error={query.error}/>
        )
    }
    return (
        <MangaVerticalElement src={query.data!} isRefetching={query.isRefetching}/>
    )
}