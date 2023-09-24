import * as Chakra from "@chakra-ui/react";
import { Tag } from "@mangadex/api/structures/Tag";
import React from "react";
import { Await } from "react-router-dom";
import { TagRow } from "../../../Mainpage/boutons/tag_boutons";
import { useManga } from "@mangadex/pages/manga";

export function Content() {
    const { toUse: src } = useManga();
    return (
        <React.Fragment>
            <React.Suspense fallback={
                <Chakra.WrapItem>
                    <Chakra.Alert status="loading" variant="left-accent">
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Loading Content...</Chakra.AlertTitle>
                    </Chakra.Alert>
                </Chakra.WrapItem>
            }>
                <Await
                    resolve={src.get_async_content()}
                    errorElement={<React.Fragment />}
                >
                    {(getted: Array<Tag>) => (
                        <Chakra.WrapItem>
                            <TagRow title="Content" src={getted} />
                        </Chakra.WrapItem>
                    )}
                </Await>
            </React.Suspense>
        </React.Fragment>

    );
}
