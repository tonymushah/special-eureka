import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Tag } from "@mangadex/api/structures/Tag";
import { useQuery } from "@tanstack/react-query";

export function get_all_tag(){
    const client = useHTTPClient();
    const queryKey = ["mdx", "tags"];
    const query = useQuery(queryKey, () => {
        return Tag.get_all_tag(client);
    });
    return {
        query,
        queryKey
    };
}