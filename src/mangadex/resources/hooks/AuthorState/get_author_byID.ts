import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Author } from "@mangadex/api/structures/Author";
import get_author_queryKey_byID from "./get_author_queryKey_byID";


export default function get_author_byID(props: {
    author_id: string;
    options?: UseQueryOptions<Author, Error>;
}) {
    const client = useHTTPClient();
    const query_key = get_author_queryKey_byID(props);
    const query = useQuery<Author, Error>(query_key, () => {
        return Author.getAuthorById(props.author_id, client);
    }, props.options ?? {
        staleTime: Infinity
    });
    return {
        query_key,
        query
    };
}
