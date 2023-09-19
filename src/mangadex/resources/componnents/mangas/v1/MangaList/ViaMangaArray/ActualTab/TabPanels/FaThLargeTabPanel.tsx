import * as Chakra from "@chakra-ui/react";
import MangaElementFallback from "../../../../MangaElementFallback";
import React from "react";
import { useMangaListSrc } from "../..";

const MangaElementDef = React.lazy(() => import("../../../../MangaElementDef"));

export function FaThLargeTabPanel() {
    const src = useMangaListSrc();
    return (
        <Chakra.Wrap>
            {src.map((value) => (
                <Chakra.WrapItem
                    key={value.get_id()}
                >
                    <React.Suspense
                        fallback={<MangaElementFallback />}
                    >
                        <MangaElementDef src={value} />
                    </React.Suspense>
                </Chakra.WrapItem>
            ))}
        </Chakra.Wrap>
    );
}
