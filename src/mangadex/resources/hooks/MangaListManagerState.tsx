import { useQueryClient } from "@tanstack/react-query";

type Index = 0 | 1 | 2

export function useMangaListOption(props: {
    index?: Index
}){
    const queryClient = useQueryClient();
    const query_key = ["mdx", "manga", "list", "option"];
    if(queryClient.getQueryData<Index>(query_key) == undefined){
        queryClient.setQueryData<Index>(query_key, props.index? props.index : 0);
    }
    const data = queryClient.getQueryData<Index>(query_key);
    const updateListOption = (index: Index) => {
        queryClient.setQueryData<Index>(query_key, index);
    };
    return {
        query_key,
        data,
        updateListOption
    };
}