import { useQuery } from "react-query";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Offset_limits } from "../../api/internal/Utils";
import { Author } from "../../api/structures/Author";
import { Collection } from "../../api/structures/Collection";
import { Manga } from "../../api/structures/Manga";

export function get_author_works_byAuthor_ID(props: {
    author_id: string
}) {
    const client = useHTTPClient();
    const query_key = "mdx-author:" + props.author_id + "-works";
    const query = useQuery<Collection<Manga>, Error>(query_key, () => {
        return Manga.search({
            offset_Limits: new Offset_limits(),
            authors: [
                props.author_id
            ],
            artists: [
                props.author_id
            ],
            client: client
        })
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
