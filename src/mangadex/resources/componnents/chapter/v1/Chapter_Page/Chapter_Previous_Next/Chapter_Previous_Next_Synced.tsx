import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import { LTRSetup } from "./LTRSetup";
import { RTLSetup } from "./RTLSetup";

export function Chapter_Previous_Next_Synced() {
    const { query } = useRTLSwipperMode();
    if (query.isSuccess) {
        if (query.data) {
            return (
                <RTLSetup />
            );
        } else {
            return (
                <LTRSetup />
            );
        }
    } else {
        return (
            <React.Fragment>
                <Chakra.IconButton isLoading aria-label="previous" icon={<ChakraIcon.ChevronLeftIcon />} />
                <Chakra.IconButton isLoading aria-label="next" icon={<ChakraIcon.ChevronRightIcon />} />
            </React.Fragment>
        );
    }
}
