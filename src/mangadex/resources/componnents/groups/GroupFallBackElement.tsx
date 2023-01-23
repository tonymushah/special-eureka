import React from "react";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as Chakra from "@chakra-ui/react";

export default function GroupFallBackElement() {
    return (
        <Chakra.Box>
            <Chakra.Skeleton
                height={"30px"}
                width={"sm"}
                borderRadius={"10px"}
            />
        </Chakra.Box>
    );
}
