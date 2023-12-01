import React from "react";
import useIsCoverDownloaded from "./use_is_cover_downloaded";
import { useQuery } from "@tanstack/react-query";
import { Cover } from "@mangadex/api/structures/Cover";

export default function useCoverDownload(cover_id: string){
    const isDownloaded = useIsCoverDownloaded(cover_id);
    const _queryKey_ = React.useMemo(() => queryKey(cover_id), [cover_id]);
    const query = useQuery<Cover>(_queryKey_, async function (){
        return await Cover.downloadCover(cover_id);
    }, {
        enabled : false,
        onSuccess(){
            isDownloaded.refetch();
        }
    });
    return query;
}

export function queryKey(cover_id: string){
    return ["mdx", "cover", cover_id, "download"];
}