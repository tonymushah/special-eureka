import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { queryFn, queryKey } from "..";
import RelatedButton from "./Buttons/Related";

export default function RelatedButtoWithCondition() {
    const client = useHTTPClient();

    const { id } = useParams();
    /// [x] Refactor into a function
    const query_key = React.useMemo(() => queryKey(id), []);

    const query = useQuery<GetMangaByIDResponse, Error>(query_key, async () => {
        if (id != undefined) {
            return await queryFn(id, client);
        } else {
            throw new Error("the given manga id is undefined");
        }
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