import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Manga } from "@mangadex/api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementDef from "./MangaElementDef";
import MangaElementFallback from "./MangaElementFallback";

export default function MangaElementDef_wRelated(props: {
    mangaID: string,
    promise : Promise<Manga>
}) {
    const query = useQuery<Manga, Error>(["mdx", "manga", props.mangaID], () => { 
        return props.promise;
    }, {
        "staleTime": Infinity
    });
    if (query.isLoading) {
        return(
            <MangaElementFallback/>
        );
    }
    if(query.isError){
        return(
            <ErrorEL1 error={query.error}/>
        );
    }
    return (
        <MangaElementDef src={query.data!} isRefetching={query.isRefetching} refetch={query.refetch}/>
    );
}