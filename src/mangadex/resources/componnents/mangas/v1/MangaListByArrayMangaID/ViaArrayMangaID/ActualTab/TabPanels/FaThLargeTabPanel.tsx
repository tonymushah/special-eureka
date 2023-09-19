import * as Chakra from "@chakra-ui/react";
import MangaElementFallback from "../../../../MangaElementFallback";
import React from "react";
import { useMangaListByArrayMangaIDSrc } from "../..";

const MangaElementDef_wID = React.lazy(() => import("../../../../MangaElementDef_wID"));

export function FaThLargeTabPanel() {
    const src = useMangaListByArrayMangaIDSrc();
    return (
        <Chakra.Wrap>
            {src.map((value) => (
                <Chakra.WrapItem
                    key={value}
                >
                    <React.Suspense fallback={<MangaElementFallback />}>
                        <MangaElementDef_wID mangaID={value} />
                    </React.Suspense>
                </Chakra.WrapItem>
            ))}
        </Chakra.Wrap>
    );
}
