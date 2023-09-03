import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useManga } from "@mangadex/pages/manga";

const Aggregate_Chapters = React.lazy(() => import("../top_chap/Aggregate_Chapters"));

export function Chapters() {
    const { toUse: src } = useManga();
    return (
        <React.Suspense
            fallback={<Chakra.Alert status="loading">
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
            </Chakra.Alert>}
        >
            <Aggregate_Chapters src={src} />
        </React.Suspense>
    );
}
