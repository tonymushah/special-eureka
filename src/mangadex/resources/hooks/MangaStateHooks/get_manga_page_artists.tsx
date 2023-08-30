import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Author } from "@mangadex/api/structures/Author";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { MangaPageProps } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { UseQueryOptions, useQueries } from "@tanstack/react-query";
import React from "react";

export function get_manga_page_artists(props: MangaPageProps) {
    const client = useHTTPClient();
    const queries = React.useMemo<UseQueryOptions<Author>[]>(() => {
        const manga = props.src;
        if (manga instanceof Manga_with_allRelationship) {
            return manga.$artists.map(artistist => ({
                queryKey: queryKey(artistist.get_id()),
                queryFn: () => Author.getAuthorById(artistist.get_id()),
                initialData: artistist,
                staleTime: Infinity
            }));
        } else {
            return manga.get_artists_id().map(author_id => {
                return {
                    // [x] Refactor this query key into a function
                    queryKey: queryKey(author_id),
                    queryFn: () => props.src.get_artist_byID(author_id, client),
                    staleTime: Infinity,
                };
            });
        }
    }, []);
    const artistists = useQueries({
        queries
    });
    return artistists;
}

export function queryKey(author_id: string): string[] {
    return ["mdx", "author", author_id];
}