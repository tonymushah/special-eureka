import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import Manga from "@mangadex/api/structures/Manga";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function get_manga_downloaded_cover_arts(manga_id : string, offseLimit_? : Offset_limits){
    const offseLimit = React.useMemo(() => offseLimit_ ?? new Offset_limits(0, 25), [offseLimit_]);
    const client = useHTTPClient();
    const _queryKey_ = React.useMemo(() => queryKey(manga_id, offseLimit), [manga_id, offseLimit]);
    const query = useQuery(_queryKey_, async () => {
        return await Manga.getAllDownloadedCover_ofAManga(manga_id, offseLimit, client);
    });
    return query;
}

export function queryKey(manga_id : string, offseLimit?: Offset_limits){
    return ["mdx", "manga", manga_id, "downloaded-covers", offseLimit];
}