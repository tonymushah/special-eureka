import { useUserOption } from "@mangadex/resources/componnents/userOption/utils/UserOptionProvider";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

export default function useRTLSwipperMode(query_options?: Omit<UseQueryOptions<boolean, unknown, boolean, string[]>, "queryFn" | "queryKey">) {
    // [x] Refactor this query key into a function
    // [x] use `React.useMemo` for optimization
    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const userCachedOption = useUserOption();
    const query = useQuery(_queryKey_, async () => {
        return userCachedOption.getRtlSwipperMode();
    }, query_options);
    const changeOptionMutation = useMutation({
        mutationKey: _queryKey_.concat("mutation"),
        mutationFn: async (new_: boolean) => {
            await userCachedOption.setRtlSwipperMode(new_);
        },
        onSuccess() {
            query.refetch();
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
        queryKey: _queryKey_,
        changeOption,
        toggle
    };
}

function queryKey() {
    return ["mdx", "server", "rtlSwipperMode"];
}
