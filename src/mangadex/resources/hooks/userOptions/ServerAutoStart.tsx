import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";
import { useMutation, useQuery, UseQueryOptions } from "react-query";

export default function useServerAutoStart(query_options? : Omit<UseQueryOptions<boolean, unknown, boolean, "mdx-server-auto-start">, "queryFn" | "queryKey">){
    const queryKey = "mdx-server-auto-start";
    const userCachedOption = useUserOption();
    const query = useQuery(queryKey, async () => {
        return userCachedOption.getServerAutoStart()
    }, query_options);
    const changeOptionMutation = useMutation({
        mutationFn : async (new_ : boolean) => {
            console.log("test")
            await userCachedOption.setServerAutoStart(new_)
        },
        onSuccess(){
            query.refetch()
        }
    })
    const changeOption = changeOptionMutation.mutate;
    const toggle = () => {
        if(query.isSuccess){
            changeOption(!query.data);
        }
    }
    return {
        query,
        queryKey,
        changeOption,
        toggle
    };
}