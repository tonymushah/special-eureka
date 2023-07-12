import React from "react";
import { OptionOverlayAtom } from "./OptionOverlay";
import { useAtom } from "jotai";
import { DrawerOverlay } from "@chakra-ui/react";

export default function Overlay() {
    const [ isOverlay ] = useAtom(OptionOverlayAtom);
    return (
        <React.Fragment>
            {
                isOverlay == true ? (
                    <DrawerOverlay
                        zIndex={"100"}
                    />
                ) : (
                    <React.Fragment />
                )
            }
        </React.Fragment>
    );
}