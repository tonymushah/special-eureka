import { useUserOption } from "@mangadex/resources/componnents/userOption/UserOptionProvider";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

export default function useRTLSwipperMode(query_options? : Omit<UseQueryOptions<boolean, unknown, boolean, string[]>, "queryFn" | "queryKey">){
    const queryKey = ["mdx", "server", "rtlSwipperMode"];
    const userCachedOption = useUserOption();
    const query = useQuery(queryKey, async () => {
        return userCachedOption.getRtlSwipperMode();
    }, query_options);
    const changeOptionMutation = useMutation({
        mutationKey : queryKey.concat("mutation"),
        mutationFn : async (new_ : boolean) => {
            await userCachedOption.setRtlSwipperMode(new_);
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