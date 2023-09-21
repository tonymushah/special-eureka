import * as Chakra from "@chakra-ui/react";
import MangaVerticalElementFallback from "../../../../MangaVerticalElementFallback";
import React from "react";
import { useMangaListByArrayMangaIDSrc } from "../..";

const MangaVerticalElement_wID = React.lazy(() => import("../../../../MangaVerticalElement_wID"));

export function FaThTabPanel() {
    const src = useMangaListByArrayMangaIDSrc();
    return (
        <Chakra.Wrap>
            {src.map((value) => (
                <Chakra.WrapItem
                    key={value}
                >
                    <React.Suspense fallback={<MangaVerticalElementFallback />}>
                        <MangaVerticalElement_wID mangaID={value} />
                    </React.Suspense>
                </Chakra.WrapItem>
            ))}
        </Chakra.Wrap>
    );
}
