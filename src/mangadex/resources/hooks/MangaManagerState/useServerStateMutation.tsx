import { UseQueryResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { launch_server, stop_server } from "@mangadex/api/offline/plugin";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";

export default function useServerStateMutation({ key, query }: { key: string[]; query: UseQueryResult<boolean>; }) {
    const toast = useChakraToast({
        id: "offline-server",
        position: "bottom-right",
        duration: 9000
    });
    const queryClient = useQueryClient();
    const switch_server_state = useMutation({
        mutationKey: key.concat("mutation"),
        "mutationFn": async () => {
            if (query.data == false) {
                return await launch_server();
            } else {
                return await stop_server();
            }
        },
        "retry": 0,
        onSuccess: () => {
            query.refetch();
        },
        onError(error) {
            if (typeof error == "string") {
                toast({
                    status: "error",
                    title: "Error on executing",
                    description: error,
                    isClosable: true
                });
            } else if (typeof error == "object" && error instanceof Error) {
                toast({
                    status: "error",
                    title: "Error on executing",
                    description: error.message,
                    isClosable: true
                });
            } else {
                toast({
                    status: "error",
                    title: "Error on executing",
                    description: JSON.stringify(error),
                    isClosable: true
                });
            }

            queryClient.refetchQueries({
                "queryKey": key
            });
        },
    });
    return switch_server_state;
}
