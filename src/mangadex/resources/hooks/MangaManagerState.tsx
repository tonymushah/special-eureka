import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DesktopApi from "../../api/offline/DeskApiRequest";
import { launch_server, stop_server } from "../../api/offline/plugin";

export default function MangaManagerState(){
    const queryClient = useQueryClient();
    const key= "mdx-offline_server"
    const query = useQuery(key, async () => {
        let getted = await DesktopApi.ping()
        return getted;
    }, {
        staleTime : Infinity
    })
    const switch_server_state = useMutation({
        "mutationFn" : () => query.data == false ? launch_server() : stop_server(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                "queryKey" : key
            });
        }
    })
    return {
        server_query : query,
        switch_server_state: switch_server_state
    }
}