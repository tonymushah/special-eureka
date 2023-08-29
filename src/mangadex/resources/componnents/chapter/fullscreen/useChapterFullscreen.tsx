import { MutationKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export function useChapterFullscreen() {
    const queryClient = useQueryClient();
    // [x] Refactor into a function
    const queryKey_: readonly string[] = React.useMemo(() => queryKey(), []);
    const query = useQuery(queryKey_, {
        "initialData": false,
        queryFn: async () => {
            return false;
        },
    });
    const mutationKey: MutationKey = queryKey_.concat("mutation");
    const update_mutation = useMutation({
        mutationFn: async (value: boolean) => {
            queryClient.setQueryData(queryKey_, value);
        },
        mutationKey: mutationKey
    });
    return {
        queryKey: queryKey_,
        query,
        update_mutation,
        update: update_mutation.mutate,
        toggle: () => {
            if (query.data != undefined) {
                update_mutation.mutate(!(query.data));
            }
        }
    };
}

export function queryKey(): readonly string[] {
    return ["mdx", "chapter", "fullscreen-mode"];
}

