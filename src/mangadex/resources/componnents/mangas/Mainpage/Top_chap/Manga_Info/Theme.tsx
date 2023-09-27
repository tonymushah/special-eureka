import * as Chakra from "@chakra-ui/react";
import { Tag } from "@mangadex/api/structures/Tag";
import React from "react";
import { Await } from "react-router-dom";
import { TagRow } from "../../../Mainpage/boutons/tag_boutons";
import { useManga } from "@mangadex/pages/manga";

export function Theme() {
    const { toUse: src } = useManga();
    return (
        <React.Fragment>
            <React.Suspense fallback={
                <Chakra.WrapItem>
                    <Chakra.Alert status="loading" variant="left-accent">
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Loading Theme...</Chakra.AlertTitle>
                    </Chakra.Alert>
                </Chakra.WrapItem>
            }>
                <Await
                    resolve={src.get_async_theme()}
                    errorElement={<React.Fragment/>}
                >
                    {(getted: Array<Tag>) => (
                        <Chakra.WrapItem>
                            <TagRow title="Theme" src={getted} />
                        </Chakra.WrapItem>
                    )}
                </Await>
            </React.Suspense>
        </React.Fragment>
        
    );
}
