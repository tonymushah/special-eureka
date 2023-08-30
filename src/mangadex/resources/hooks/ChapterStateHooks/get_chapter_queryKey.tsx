import { QueryKey } from "@tanstack/react-query";


export function get_chapter_queryKey(props: {
    id: string;
}): QueryKey {
    return ["mdx", "chapter", props.id];
}
