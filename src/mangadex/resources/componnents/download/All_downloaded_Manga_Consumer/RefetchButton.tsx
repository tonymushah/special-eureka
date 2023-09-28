import { Button } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import Manga from "@mangadex/api/structures/Manga";
import { QueryKey, useQueryClient, useMutation } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

export default function RefetchButton({ query_key }: {
    query_key: QueryKey
}) {
    const queryClient = useQueryClient();
    const client = useHTTPClient();
    const toast = useChakraToast({
        id: JSON.stringify(query_key)
    });

    const refetch = useMutation({
        mutationKey: query_key.concat("refetch"),
        mutationFn: () => {
            toast({
                position: "bottom-right",
                title: "Patching all manga...",
                status: "loading",
                "duration": 9000,
                "isClosable": true
            });
            return Manga.refetch_all_manga(client);
        },
        onSuccess: () => {
            toast({
                position: "bottom-right",
                title: "Patched",
                status: "success",
                "duration": 9000,
                "isClosable": true
            });
            queryClient.refetchQueries({
                queryKey: query_key
            });
        },
        onError(error: Error) {
            toast({
                position: "bottom-right",
                title: "Error on patching",
                description: error.message,
                status: "error",
                "duration": 9000,
                "isClosable": true
            });
        },
    });
    return (
        <Button
            isLoading={refetch.isLoading}
            colorScheme={"orange"}
            spinner={<BeatLoader size={8} />}
            onClick={() => {
                if (!refetch.isLoading) refetch.mutate();
            }}
        >
            Refetch all manga
        </Button>
    );
}
