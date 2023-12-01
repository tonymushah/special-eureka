import { Author } from "@mangadex/api/structures/Author";
import get_author_works_byAuthor_ID from "./get_author_works_byAuthor_ID";


export default function get_author_works(props: {
    src: Author;
}) {
    return get_author_works_byAuthor_ID({
        author_id: props.src.get_id()
    });
}
