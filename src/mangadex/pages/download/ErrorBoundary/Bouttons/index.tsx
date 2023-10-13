import * as Chakra from "@chakra-ui/react";
import ServerButton from "./ServerButton";
import GoBackButton from "@mangadex/resources/componnents/router/error/RefreshAndBackButtons/GoBackButton";
import RefreshButton from "@mangadex/resources/componnents/router/error/RefreshAndBackButtons/RefreshButton";

export function RefreshServerBackButtons() {
    return (
        <Chakra.ButtonGroup>
            <GoBackButton/>
            <ServerButton/>
            <RefreshButton/>
        </Chakra.ButtonGroup>
    );
}
