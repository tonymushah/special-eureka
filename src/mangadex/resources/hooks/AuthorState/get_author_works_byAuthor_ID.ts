import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import Collection from "@mangadex/api/structures/Collection";
import Manga from "@mangadex/api/structures/Manga";
import React from "react";
import get_author_works_promise from "./get_author_works_promise";
import get_author_works_query_key_byAuthor_ID from "./get_author_works_query_key_byAuthor_ID";


export default function get_author_works_byAuthor_ID(props: {
    author_id: string;
}) {
    const client = useHTTPClient();
    const query_key = React.useMemo(() => get_author_works_query_key_byAuthor_ID(props), []);
    const query = useQuery<Collection<Manga>, Error>(query_key, () => {
        return get_author_works_promise({
            client: client,
            ...props
        });
    }
    );
    return {
        query_key,
        query
    };
}
