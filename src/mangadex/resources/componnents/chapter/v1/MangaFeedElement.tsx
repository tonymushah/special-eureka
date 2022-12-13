import React from "react"
import * as Chakra from "@chakra-ui/react"
import MangaElementDef_WChildren from "../../mangas/v1/MangaElementDef_WChildren";
import Chapter_Element1 from "./Chapter_Element1";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";
import { Chapter } from "../../../../api/structures/Chapter";
import { useQuery } from "react-query";

export default function MangaFeedElement(props: {
    src : Chapter
}) {
    const manga_query_key = "mdx-manga:" + props.src.get_manga_id();
    const query = useQuery(manga_query_key, () => {
        return props.src.get_manga()
    },{
        staleTime : Infinity
    });
    if(query.isLoading){
        return (
            <MangaElementFallback/>
        );
    }
    if(query.isError){
        return (
            <ErrorEL1 error={query.error}/>
        );
    }
    return (
        <MangaElementDef_WChildren 
            src={query.data!}
            isRefetching={query.isRefetching}
        >
            <Chapter_Element1
                chapter={props.src}
            />
        </MangaElementDef_WChildren>
    )
}