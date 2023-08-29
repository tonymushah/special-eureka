import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { User } from "@mangadex/api/structures/User";
import { useQuery } from "@tanstack/react-query";


export function get_chapter_user_uploader(props: {
    chapter: Chapter;
}) {
    const client = useHTTPClient();
    // [ ] Refactor query key into a new function
    const user_query_key = ["mdx", "user", props.chapter.get_user_id()];
    const user_query = useQuery<User, Error>(user_query_key, () => {
        return props.chapter.get_userUploader(client);
    }, {
        staleTime: Infinity,
        retry: 1
    });
    return {
        user_query_key,
        user_query
    };
}
