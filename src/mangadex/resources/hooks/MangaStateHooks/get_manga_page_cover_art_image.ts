import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Cover } from "@mangadex/api/structures/Cover";
import Manga, { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import MangadexNotFound from "@mangadex/resources/imgs/cover-not-found.jpg";

export function cover_queryKey(id: string) {
    return ["mdx", "cover", id];
}

export default function get_manga_page_cover_art_image(props: {
    src: Manga;
    isThumbail?: boolean;
    scale?: 256 | 512;
}) {
    const client = useHTTPClient();
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo()` for optimization
    const query_key = React.useMemo(() => queryKey(props.src.get_id()), []);
    const queryClient = useQueryClient();
    const query = useQuery<string>(query_key, async () => {
        let data: Cover | undefined = undefined;
        try {
            const cover_id = props.src.get_cover_art_id();
            // [x] Refactor this query key into a function
            const cover_query_key = cover_queryKey(cover_id);
            const queryData = queryClient.getQueryData<Cover>(cover_query_key);
            if (queryData == undefined) {
                const manga = props.src;
                if (manga instanceof Manga_with_allRelationship) {
                    data = await queryClient.fetchQuery(cover_query_key, () => Cover.getById(cover_id), {
                        initialData: manga.$cover
                    });
                } else {
                    data = await queryClient.fetchQuery<Cover>(cover_query_key, () => props.src.get_cover_art(client));
                }
            } else {
                data = queryData;
            }
        } catch (error) {
            data = await props.src.get_cover_art(client);
            // [x] Refactor this query key into a function
            data = queryClient.setQueryData(cover_queryKey(data.get_id()), data);
        }
        
        if (data != undefined) {
            if (props.isThumbail == true) {
                if (props.scale == 512) {
                    return await data.get_CoverImage_thumbnail_promise(512, client);
                } else {
                    return await data.get_CoverImage_thumbnail_promise(256, client);
                }
            } else {
                return await data.get_CoverImage_promise(client);
            }
        }else{
            return MangadexNotFound;
        }
    });
    return {
        query_key,
        query
    };
}

export function queryKey(id: string) {
    return ["mdx", "manga", id, "cover-art", "image"];
}