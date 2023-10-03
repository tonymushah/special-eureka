import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useUserOption } from "@mangadex/resources/componnents/userOption/utils/UserOptionProvider";
import React from "react";

export function useMangaListOption(){
    const useroption = useUserOption();
    // [x] Refactor `queryKey` into a new function
    const query_key = React.useMemo<QueryKey>(() => queryKey(), []);
    const query = useQuery(query_key, () => {
        return useroption.getMangaListOption();
    });
    const [isTranstion, startTransition] = React.useTransition();
    const mutation = useMutation({
        mutationKey : query_key.concat("mutation"),
        mutationFn: async (input : number) => {
            await useroption.setMangaListOption(input);
            return await useroption.getMangaListOption();
        },
        onSuccess() {
            query.refetch();
        },
    });
    return {
        query_key,
        ...query,
        updateListOption : (input : number) => startTransition(() => mutation.mutate(input)),
        mutation,
        isTranstion
    };
}

export function queryKey() {
    return ["mdx", "manga", "list", "option"];
}
