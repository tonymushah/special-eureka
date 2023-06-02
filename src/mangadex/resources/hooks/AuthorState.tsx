import { Client } from "@tauri-apps/api/http";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { Collection } from "@mangadex/api/structures/Collection";
import { Manga } from "@mangadex/api/structures/Manga";

export function get_author_queryKey_byID(props: {
    author_id: string
}) : QueryKey{
    return ["mdx", "author", props.author_id];
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
    });
    return {
        query_key,
        query
    };
}

export async function get_author_works_promise(props: {
    author_id: string,
    client: Client
}) {
    const author = (await Author.getAuthorById(props.author_id, props.client));
    await author.build_Works(props.client);
    const works = author.get_works();
    if(works){
        return works;
    }else{
        throw new Error("this author has no work");
    }
}

export function get_author_works_query_key_byAuthor_ID(props: {
    author_id: string
}){
    return ["mdx", "author", props.author_id, "works"];
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
    };
}

export function get_author_works(props: {
    src: Author
}) {
    return get_author_works_byAuthor_ID({
        author_id: props.src.get_id()
    });
}
