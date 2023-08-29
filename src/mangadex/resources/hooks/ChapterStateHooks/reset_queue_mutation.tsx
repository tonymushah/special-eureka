import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { reset_queue } from "@mangadex/api/offline/plugin";
import { useMutation } from "@tanstack/react-query";


export function reset_queue_mutation() {
    const toast = useChakraToast({
        id: "mdx-reset-queue",
        position: "bottom-right",
        duration: 9000,
    });
    const mutation = useMutation({
        mutationKey: ["mdx", "queue_reset"],
        mutationFn: () => {
            return reset_queue();
        },
        onError(error: string) {
            toast({
                status: "error",
                isClosable: true,
                title: "Error on reset",
                description: error
            });
        },
        onSuccess() {
            toast({
                status: "success",
                isClosable: true,
                title: "Queue reinitilized"
            });
        },
    });
    return mutation;
}
