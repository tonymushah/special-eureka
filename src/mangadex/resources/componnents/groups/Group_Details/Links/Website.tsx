import React from "react";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";
import { ExtLink } from ".";


export function Website() {
    const { group: src } = useGroupRouteOutletContext();
    const website = React.useMemo(() => src.get_website(), [src]);
    if (website != undefined && website != null) {
        return (
            <ExtLink href={website}>
                <Chakra.Button leftIcon={<ChakraIcon.ExternalLinkIcon />} colorScheme={"gray"}>Website</Chakra.Button>
            </ExtLink>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
