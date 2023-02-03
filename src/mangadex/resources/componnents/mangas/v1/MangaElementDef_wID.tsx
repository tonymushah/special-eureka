import { useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { Manga } from "../../../../api/structures/Manga";
import { get_manga_byId, useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementFallback from "./MangaElementFallback";

const MangaElementDef = React.lazy(() => import("./MangaElementDef"));

export default function MangaElementDef_wID(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID : props.mangaID
    });
    const { delete_, download_ } = useMangaDownload_Delete(props);
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
                download={download_.mutate}
                delete={delete_.mutate}
            />
        </React.Suspense>
    )
}