import * as Chakra from "@chakra-ui/react";
import React from "react";
import { TagRow } from "../../../Mainpage/boutons/tag_boutons";
import { useManga } from "@mangadex/pages/manga";




export function Genre() {
    const { toUse: src } = useManga();
    return (
        <Chakra.WrapItem>
            <React.Fragment>
                <React.Suspense
                    fallback={<Chakra.Alert status="loading" variant="left-accent">
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Loading Genre...</Chakra.AlertTitle>
                    </Chakra.Alert>}
                >
                    <TagRow title="Genre" src={src.get_genre()} />
                </React.Suspense>
            </React.Fragment>
        </Chakra.WrapItem>
    );
}
