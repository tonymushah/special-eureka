import { Button } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { Manga } from "@mangadex/api/structures/Manga";
import { QueryKey, useQueryClient, useMutation } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

export default function PatchButton({ query_key }: {
    query_key: QueryKey
}) {
    const queryClient = useQueryClient();
    const client = useHTTPClient();
    const toast = useChakraToast({
        id: JSON.stringify(query_key)
    });
    const patch_all_manga = useMutation({
        mutationFn: () => {
            toast({
                position: "bottom-right",
                title: "Patching all manga...",
                status: "loading",
                "duration": 9000,
                "isClosable": true
            });
            return Manga.patch_all_manga_cover(client);
        },
        mutationKey: query_key,
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
            isLoading={patch_all_manga.isLoading}
            spinner={<BeatLoader size={8} />}
            colorScheme={"facebook"}
            onClick={() => patch_all_manga.mutate()}
        >
            Patch all manga cover
        </Button>
    );
}