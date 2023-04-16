import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import DesktopApi from "@mangadex/api/offline/DeskApiRequest";
import { launch_server, stop_server } from "@mangadex/api/offline/plugin";

export default function MangaManagerState(){
    const queryClient = useQueryClient();
    const client = useHTTPClient();
    const key= ["mdx", "offline_server"];
    const toast = useToast({
        position: "bottom-right",
        duration: 9000
    });
    const query = useQuery(key, async () => {
        const getted = await DesktopApi.ping(client);
        return getted;
    }, {
        "staleTime" : 0,
        "refetchOnWindowFocus" : true
    });
    const switch_server_state = useMutation({
        mutationKey : key.concat("mutation"),
        "mutationFn" : () => {
            return query.data == false ? launch_server() : stop_server();
        },
        onSuccess: () => {
            query.refetch();
        }, 
        onError(error) {
            if(typeof error == "string"){
                toast({
                    status: "error",
                    title: "Error on executing",
                    description : error,
                    isClosable: true
                });
            }else if (typeof error == "object" && error instanceof Error){
                toast({
                    status: "error",
                    title: "Error on executing",
                    description : error.message,
                    isClosable: true
                });
            }else{
                toast({
                    status: "error",
                    title: "Error on executing",
                    description : JSON.stringify(error),
                    isClosable: true
                });
            }
            
            queryClient.refetchQueries({
                "queryKey" : key
            });
        },
    });
    return {
        server_query : query,
        switch_server_state: switch_server_state
    };
}