import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";

import ChakraContainer from "../../layout/Container";
import Description from "./Description";
import Links from "./Links";
import { Verification } from "./Verification";

export const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

export default function Group_Details() {
    
    return (
        <Chakra.Box minHeight={"40vh"}>
            <ChakraContainer>
                <Chakra.Grid templateColumns={"repeat(12, 1fr)"}>
                    <Chakra.GridItem colSpan={3}>
                        <Verification/>
                    </Chakra.GridItem>
                    <Chakra.GridItem colSpan={9}>
                        <Links/>
                        <Description/>
                    </Chakra.GridItem>
                </Chakra.Grid>
            </ChakraContainer>
        </Chakra.Box>
    );
}
