import React from "react";
import useServerStateQuery, { querykey as useServerStateQuery_queryKey } from "./useServerStateQuery";
import { useQuery } from "@tanstack/react-query";
import { get_running_tasks } from "@mangadex/plugin";

export default function useRunningTasks(){
    const queryKey_ = React.useMemo(() => queryKey(), []);
    const { query : serverStateQuery } = useServerStateQuery();
    return useQuery(queryKey_, async function () {
        return await get_running_tasks();
    }, {
        enabled : serverStateQuery.data == true,
        refetchOnMount : true,
        refetchOnWindowFocus : true,
        staleTime: 0
    });
}

export function queryKey() {
    return useServerStateQuery_queryKey().concat("running_tasks");
}