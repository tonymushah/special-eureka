import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MangaPageProps } from "..";

export function useState(props: React.PropsWithChildren<MangaPageProps>) {
    const client = useHTTPClient();
    const manga_statistics_queryKey = React.useMemo(() => queryKey(props), []);
    /// [x] Split into a new file and refactor query key into a new file
    const manga_statistics = useQuery<Statistics_Manga, Error>(manga_statistics_queryKey, () => {
        return Statistics_Manga.get_statsBy_MangaID(props.src.get_id(), client);
    }, {
        staleTime: Infinity
    });
    return manga_statistics;
}

export function queryKey(props: React.PropsWithChildren<MangaPageProps>) {
    return ["mdx", "manga", props.src.get_id(), "statistics"];
}
