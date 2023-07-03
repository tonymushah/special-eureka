import { IconButton } from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";
import { FiXSquare } from "react-icons/fi";

export default function CloseButton() {
    return (
        <IconButton
            onClick={() => {
                appWindow.close();
            }}
            aria-label="Close Window"
            icon={<FiXSquare/>}
        />
    );
}