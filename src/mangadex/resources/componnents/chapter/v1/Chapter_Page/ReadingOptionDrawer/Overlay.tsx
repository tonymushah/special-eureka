import React from "react";
import { OptionOverlayAtom } from "./OptionOverlayAtom";
import { useAtom } from "jotai";
import { DrawerOverlay } from "@chakra-ui/react";

export default function Overlay() {
    const [isOverlay] = useAtom(OptionOverlayAtom);
    if (isOverlay) {
        return (
            <DrawerOverlay
                zIndex={"100"}
            />
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}