import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useManga } from "@mangadex/pages/manga";

const Author_Artists_ = React.lazy(() => import("../../top_chap/Author_Artists"));

export function Author_Artists() {
    const { toUse: src } = useManga();
    return (
        <Chakra.WrapItem>
            <React.Suspense
                fallback={<Chakra.Box m={2} bg="inherit">
                    <Chakra.Alert status="loading" variant="left-accent">
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Loading Author and Artists...</Chakra.AlertTitle>
                    </Chakra.Alert>
                </Chakra.Box>}
            >
                <Author_Artists_ src={src} />
            </React.Suspense>
        </Chakra.WrapItem>
    );
}
