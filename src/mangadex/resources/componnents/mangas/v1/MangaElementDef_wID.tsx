import React from "react";
import { get_manga_byId } from "../../../hooks/MangaStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementFallback from "./MangaElementFallback";

const MangaElementDef = React.lazy(() => import("./MangaElementDef"));

export default function MangaElementDef_wID(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID : props.mangaID
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
        <React.Suspense
            fallback={
                <MangaElementFallback/>
            }
        >
            <MangaElementDef 
                src={query.data!} 
                isRefetching={query.isRefetching} 
                refetch={query.refetch}
            />
        </React.Suspense>
    )
}