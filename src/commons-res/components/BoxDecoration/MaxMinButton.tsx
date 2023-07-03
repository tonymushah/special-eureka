import { FaExpandAlt } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";

export default function MinMaxButton() {
    return (
        <IconButton
            onClick={() => {
                appWindow.toggleMaximize().catch((e) => console.error(e));
            }}
            aria-label="Resize Window"
            icon={<FaExpandAlt/>}
        />
    );
}