import { Client } from "@tauri-apps/api/http";
import { QueryKey, useQuery } from "react-query";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Offset_limits } from "../../api/internal/Utils";
import { Author } from "../../api/structures/Author";
import { Collection } from "../../api/structures/Collection";
import { Manga } from "../../api/structures/Manga";

export function get_author_queryKey_byID(props: {
    author_id: string
}) : QueryKey{
    return "mdx-author:" + props.author_id;
}

export function get_author_byID(props : { 
    author_id: string
}){
    const client = useHTTPClient();
    const query_key = get_author_queryKey_byID(props);
    const query = useQuery<Author, Error>(query_key, () => {
        return Author.getAuthorById(props.author_id, client);
    },{
        staleTime : Infinity
    })
    return {
        query_key,
        query
    }
}

export function get_author_works_promise(props: {
    author_id: string,
    client: Client
}) {
    return Manga.search({
        offset_Limits: new Offset_limits(),
        authors: [
            props.author_id
        ],
        artists: [
            props.author_id
        ],
        client: props.client
    })
}

export function get_author_works_query_key_byAuthor_ID(props: {
    author_id: string
}){
    return "mdx-author:" + props.author_id + "-works";
}

export function get_author_works_byAuthor_ID(props: {
    author_id: string
}) {
    const client = useHTTPClient();
    const query_key = get_author_works_query_key_byAuthor_ID(props);
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
    }
}

export function get_author_works(props: {
    src: Author
}) {
    return get_author_works_byAuthor_ID({
        author_id: props.src.get_id()
    });
}
