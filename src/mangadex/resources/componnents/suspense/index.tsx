import * as Chakra from "@chakra-ui/react";
import { useAtom } from "jotai";
import { isActiveAtom } from "../kuru_kuru/atom";
import invokeHerta, { getRandomGif } from "../kuru_kuru/invocation";
import React from "react";

function OnHertaActive() {
    const invokeKuru = React.useCallback(() => {
        invokeHerta();
    }, []);
    return (
        <Chakra.Image
            onClick={invokeKuru}
            width={"lg"}
            src={getRandomGif()}
        />
    );
}

function SuS_Spinner() {
    const [isActive] = useAtom(isActiveAtom);
    if (isActive) {
        return (
            <OnHertaActive />
        );
    } else {
        return (
            <Chakra.Spinner
                size={"lg"}
                thickness={"2px"}
                color={"orange"}
            />
        );
    }
}

export function Mangadex_suspense__() {

    return (
        <Chakra.Box
            width={"container.lg"}
            height={"container.lg"}
        >
            <Chakra.Center>
                <SuS_Spinner />
            </Chakra.Center>
        </Chakra.Box>
    );
}