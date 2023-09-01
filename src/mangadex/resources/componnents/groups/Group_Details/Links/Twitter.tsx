import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as FontAwesome from "react-icons/fa";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";
import { ExtLink } from ".";


export function Twitter() {
    const { group: src } = useGroupRouteOutletContext();
    const twitter = React.useMemo(() => src.get_twitter(), [src]);
    if (twitter != undefined && twitter != null) {
        return (
            <ExtLink href={twitter}>
                <Chakra.Button leftIcon={<FontAwesome.FaTwitter />} colorScheme={"twitter"}>Twitter</Chakra.Button>
            </ExtLink>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
