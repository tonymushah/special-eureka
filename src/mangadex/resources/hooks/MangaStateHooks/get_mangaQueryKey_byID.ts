import { QueryKey } from "@tanstack/react-query";


export default function get_mangaQueryKey_byID(props: {
    mangaID: string;
}): QueryKey {
    return ["mdx", "manga", props.mangaID];
}
