import { IconButton } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";
import { FiXSquare } from "react-icons/fi";

export default function CloseButton() {
    const mutation = useMutation({
        mutationKey: ["tauri", "close", "mutation"],
        mutationFn: async () => {
            await appWindow.close();
        }
    });
    return (
        <IconButton
            onClick={() => {
                mutation.mutate();
            }}
            aria-label="Close Window"
            isLoading={mutation.isLoading}
            icon={<FiXSquare/>}
        />
    );
}