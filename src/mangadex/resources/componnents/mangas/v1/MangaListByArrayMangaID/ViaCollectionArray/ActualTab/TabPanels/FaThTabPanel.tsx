import * as Chakra from "@chakra-ui/react";
import MangaVerticalElementFallback from "../../../../MangaVerticalElementFallback";
import React from "react";
import { useMangaListByCollectionArrayMangaIDSrc } from "../..";

const MangaVerticalElement_wID = React.lazy(() => import("../../../../MangaVerticalElement_wID"));

export function FaThTabPanel() {
    const src = useMangaListByCollectionArrayMangaIDSrc();
    return (
        <Chakra.Wrap>
            {src.map((value, index) => (
                <React.Fragment key={`ThTabPanel-${value.get_offset()}-${value.get_limit()}-${index}-3`}>
                    {value.get_data().map((id) => (
                        <React.Suspense
                            key={`${id}-3`}
                            fallback={<MangaVerticalElementFallback />}
                        >
                            <MangaVerticalElement_wID mangaID={id} />
                        </React.Suspense>
                    ))}
                </React.Fragment>
            ))}
        </Chakra.Wrap>
    );
}
