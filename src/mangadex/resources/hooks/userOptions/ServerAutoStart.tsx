import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useServerAutoStart(query_options? : Omit<UseQueryOptions<boolean, unknown, boolean, string[]>, "queryFn" | "queryKey">){
    // [ ] Refactor this query key into a function
    // [ ] use `React.useMemo` for optimization
    const queryKey = ["mdx", "server", "auto-start"];
    const userCachedOption = useUserOption();
    const query = useQuery(queryKey, async () => {
        return userCachedOption.getServerAutoStart();
    }, query_options);
    const changeOptionMutation = useMutation({
        mutationKey : queryKey.concat("mutation"),
        mutationFn : async (new_ : boolean) => {
            await userCachedOption.setServerAutoStart(new_);
        },
        onSuccess(){
            query.refetch();
        }
    });
    const changeOption = changeOptionMutation.mutate;
    const toggle = () => {
        if(query.isSuccess){
            changeOption(!query.data);
        }
    };
    return {
        query,
        queryKey,
        changeOption,
        toggle
    };
}