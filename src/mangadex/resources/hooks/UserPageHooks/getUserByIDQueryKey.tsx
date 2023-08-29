import { QueryKey } from "@tanstack/react-query";

export function getUserByIDQueryKey(props: {
    user_id: string;
}) : QueryKey {
    return ["mdx", "user", props.user_id];
}
