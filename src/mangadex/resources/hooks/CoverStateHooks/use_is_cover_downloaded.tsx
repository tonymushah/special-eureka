import { Cover } from "@mangadex/api/structures/Cover";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useIsCoverDownloaded(cover_id : string){
    const _queryKey_ = React.useMemo(() => queryKey(cover_id), [cover_id]);
    const query = useQuery<boolean, Error>(_queryKey_, async function () {
        try {
            await Cover.getAOfflineCover(cover_id);
            return true;
        } catch (error) {
            return false;
        }
    });
    return query;
}

export function queryKey(cover_id : string){
    return ["mdx", "cover", cover_id, "is-downloaded"];
}