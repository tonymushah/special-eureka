import React from "react";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";
import { ExtLink } from ".";


export function MangaUpdates() {
    const { group: src } = useGroupRouteOutletContext();
    const mangaUpdates = React.useMemo(() => src.get_mangaUpdates(), [src]);
    if (mangaUpdates != undefined && mangaUpdates != null) {
        return (
            <ExtLink href={mangaUpdates}>
                <Chakra.Button leftIcon={<ChakraIcon.ExternalLinkIcon />} colorScheme={"orange"}>MangaUpdates</Chakra.Button>
            </ExtLink>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
