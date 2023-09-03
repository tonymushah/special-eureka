import React from "react";
import * as Chakra from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";
import { ExtLink } from ".";


export function Discord() {
    const { group: src } = useGroupRouteOutletContext();
    const discord = React.useMemo(() => src.get_discord(), [src]);
    if (discord != undefined && discord != null) {
        return (
            <ExtLink href={"https://discord.gg/" + discord}>
                <Chakra.Button leftIcon={<Chakra.Icon as={FaDiscord} />} colorScheme={"facebook"}>Discord</Chakra.Button>
            </ExtLink>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
