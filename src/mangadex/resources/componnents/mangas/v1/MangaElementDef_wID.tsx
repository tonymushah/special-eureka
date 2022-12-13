import React from "react";
import { useQuery } from "react-query";
import { Manga } from "../../../../api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementDef from "./MangaElementDef";
import MangaElementFallback from "./MangaElementFallback";

export default function MangaElementDef_wID(props: {
    mangaID: string
}) {
    const query = useQuery<Manga>("mdx-manga:" + props.mangaID, () => {
        return Manga.getMangaByID(props.mangaID);
    }, {
        "staleTime": Infinity
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
        <MangaElementDef src={query.data!} isRefetching={query.isRefetching}/>
    )
}