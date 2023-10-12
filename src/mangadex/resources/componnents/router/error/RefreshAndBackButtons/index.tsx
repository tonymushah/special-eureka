import * as Chakra from "@chakra-ui/react";
import { GoBackButton } from "./GoBackButton";
import { RefreshButton } from "./RefreshButton";

export default function RefreshAndBackButtons() {
    return (
        <Chakra.ButtonGroup>
            <GoBackButton />
            <RefreshButton/>
        </Chakra.ButtonGroup>
    );
}


