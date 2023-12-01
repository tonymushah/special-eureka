import { QueryKey } from "@tanstack/react-query";


export default function get_author_queryKey_byID(props: {
    author_id: string;
}): QueryKey {
    return ["mdx", "author", props.author_id];
}
