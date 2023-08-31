import * as Chakra from "@chakra-ui/react";
import { Tag } from "@mangadex/api/structures/Tag";
import React from "react";
import { Await } from "react-router-dom";
import { TagRow } from "../../../Mainpage/boutons/tag_boutons";
import { useManga } from "@mangadex/pages/manga";




export function Format() {
    const { toUse: src } = useManga();
    return (
        <Chakra.WrapItem>
            <React.Fragment>
                <React.Suspense fallback={<Chakra.Alert status="loading" variant="left-accent">
                    <Chakra.AlertIcon />
                    <Chakra.AlertTitle>Loading format...</Chakra.AlertTitle>
                </Chakra.Alert>}>
                    <Await
                        resolve={src.get_async_format()}
                        errorElement={<div> </div>}
                    >
                        {(getted: Array<Tag>) => {
                            return (<TagRow title="Format" src={getted} />);
                        }}
                    </Await>
                </React.Suspense>
            </React.Fragment>
        </Chakra.WrapItem>
    );
}
