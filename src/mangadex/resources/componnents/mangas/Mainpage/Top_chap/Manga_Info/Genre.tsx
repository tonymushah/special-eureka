import * as Chakra from "@chakra-ui/react";
import React from "react";
import { TagRow } from "../../../Mainpage/boutons/tag_boutons";
import { useManga } from "@mangadex/pages/manga";

export function Genre() {
    const { toUse: src } = useManga();
    return (
        <React.Fragment>
            <React.Suspense
                fallback={
                    <Chakra.WrapItem>
                        <Chakra.Alert status="loading" variant="left-accent">
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>Loading Genre...</Chakra.AlertTitle>
                        </Chakra.Alert>
                    </Chakra.WrapItem>
                }
            >
                <Chakra.WrapItem>
                    <TagRow title="Genre" src={src.get_genre()} />
                </Chakra.WrapItem>
            </React.Suspense>
        </React.Fragment>
    );
}
