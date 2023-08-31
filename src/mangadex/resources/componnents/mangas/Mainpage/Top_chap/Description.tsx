import * as Chakra from "@chakra-ui/react";
import React from "react";
import Loading from "../loading";
import { useManga } from "@mangadex/pages/manga";

const Top_Chaps_Desc_Part = React.lazy(() => import("../top_chap/Top_Chaps_Desc_Part"));

export function Description() {
    const { toUse: src } = useManga();
    return (
        <Chakra.Box>
            <React.Suspense
                fallback={<Chakra.Box m={2} bg="inherit">
                    <Loading />
                </Chakra.Box>}
            >
                <Top_Chaps_Desc_Part src={src} />
            </React.Suspense>
        </Chakra.Box>
    );
}
