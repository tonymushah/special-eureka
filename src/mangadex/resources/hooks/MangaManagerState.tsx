import { ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import DesktopApi from "../../api/offline/DeskApiRequest";
import { launch_server, stop_server } from "../../api/offline/plugin";

export default function MangaManagerState(){
    const queryClient = useQueryClient();
    const client = useHTTPClient()
    const key= "mdx-offline_server"
    const toast = useToast({
        position: "bottom-right",
        duration: 9000
    });
    const query = useQuery(key, async () => {
        let getted = await DesktopApi.ping(client)
        return getted;
    }, {
        "staleTime" : Infinity
    })
    const switch_server_state = useMutation({
        "mutationFn" : () => {
            return query.data == false ? launch_server() : stop_server()
        },
        onSuccess: () => {
            queryClient.refetchQueries({
                "queryKey" : key
            });
        }, 
        onError(error) {
            toast({
                status: "error",
                title: "Error on executing",
                description : JSON.stringify(error),
                isClosable: true
            })
            queryClient.refetchQueries({
                "queryKey" : key
            });
        },
    })
    return {
        server_query : query,
        switch_server_state: switch_server_state
    }
}