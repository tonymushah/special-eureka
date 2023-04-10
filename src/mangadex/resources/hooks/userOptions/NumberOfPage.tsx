import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useElementPerPage(){
    const queryKey = ["mdx", "user-option", "element-per-page"];
    const queryClient = useQueryClient();
    const query = useQuery<number>(queryKey, async () => {
        return 10;
    }, {
        staleTime: Infinity
    });
    const changeOption = (new_ : number) => {
        if(new_ > 0){
            queryClient.setQueryData(queryKey, new_);
        }
    };
    return {
        queryKey,
        query,
        changeOption
    };
}