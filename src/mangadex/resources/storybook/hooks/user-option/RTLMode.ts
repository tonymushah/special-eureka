import { UseQueryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useStoryBookRTLSwipperMode(query_options?: Omit<UseQueryOptions<boolean, unknown, boolean, string[]>, "queryFn" | "queryKey">) {
    const queryKey = ["mdx", "server", "rtlSwipperMode"];
    const queryClient = useQueryClient();
    const query = useQuery(queryKey, async () => {
        return false;
    }, query_options);
    const changeOptionMutation = useMutation({
        mutationKey: queryKey.concat("mutation"),
        mutationFn: async (new_: boolean) => {
            queryClient.setQueryData(queryKey, new_);
        }
    });
    const changeOption = changeOptionMutation.mutate;
    const toggle = () => {
        if (query.isSuccess) {
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