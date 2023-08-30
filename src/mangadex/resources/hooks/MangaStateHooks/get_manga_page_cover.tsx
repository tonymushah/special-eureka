import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { MangaPageProps } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export function get_manga_page_cover(props: MangaPageProps) {
    const client = useHTTPClient();
    // [x] Refaction this queryKey into a function
    const cover_key = React.useMemo(() => {
        try {
            return cover_queryKey(props.src.get_cover_art_id());
        } catch {
            return manga_cover_queryKey(props.src.get_id());
        }
    }, []);
    const coverQuery = useQuery(cover_key, () => {
        return props.src.get_cover_art(client);
    }, {
        "staleTime": Infinity,
        initialData : () => {
            const manga = props.src;
            if(manga instanceof Manga_with_allRelationship){
                return manga.$cover;
            }
            return undefined;
        }
    });
    return {
        coverQuery,
        cover_key
    };
}

export function manga_cover_queryKey(id: string): string[] {
    return ["mdx", "manga", id, "cover"];
}

export function cover_queryKey(id: string): string[] {
    return ["mdx", "cover", id];
}

