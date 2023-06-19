import { FaExpandAlt } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";

export default function MinMaxButton() {
    const queryKey = ["tauri", "resize"];
    const mutation = useMutation({
        mutationKey: queryKey.concat("mutation"),
        mutationFn: async () => {
            return await appWindow.toggleMaximize();
        }
    });
    return (
        <IconButton
            onClick={() => {
                mutation.mutate();
            }}
            aria-label="Resize Window"
            isLoading={mutation.isLoading}
            icon={<FaExpandAlt/>}
        />
    );
}