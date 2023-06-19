import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserOption } from "../componnents/userOption/UserOptionProvider";

export function useMangaListOption(){
    const useroption = useUserOption();
    const query_key = ["mdx", "manga", "list", "option"];
    const query = useQuery(query_key, () => {
        return useroption.getMangaListOption();
    });
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
        updateListOption : mutation.mutate,
        mutation
    };
}