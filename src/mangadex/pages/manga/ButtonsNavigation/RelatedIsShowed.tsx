import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "@router";
import { queryFn, queryKey } from "..";
import RelatedButton from "./Buttons/Related";

export default function RelatedButtoWithCondition() {
    const client = useHTTPClient();

    const { id } = useParams("/mangadex/manga/:id");
    /// [x] Refactor into a function
    const query_key = React.useMemo(() => queryKey(id), []);

    const query = useQuery<GetMangaByIDResponse, Error>(query_key, async () => {
        return await queryFn(id, client);
    }, {
        "staleTime": Infinity,
        enabled: !!id
    });

    if (query.isSuccess && query.data.manga.get_some_relationshipLength("manga") != 0) {
        return (
            <RelatedButton />
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}