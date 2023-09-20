import * as Chakra from "@chakra-ui/react";
import MangaElementFallback from "../../../../MangaElementFallback";
import React from "react";
import { useMangaListByCollectionArrayMangaIDSrc } from "../..";

const MangaElementDef_wID = React.lazy(() => import("../../../../MangaElementDef_wID"));

export function FaThLargeTabPanel() {
    const src = useMangaListByCollectionArrayMangaIDSrc();
    return (
        <Chakra.Wrap>
            {src.map((value, index) => (
                <React.Fragment key={`ThLargeTabPanel-${value.get_offset()}-${value.get_limit()}-${index}-2`}>
                    {value.get_data().map((id) => (
                        <React.Suspense
                            key={`${id}-2`}
                            fallback={<MangaElementFallback />}
                        >
                            <MangaElementDef_wID mangaID={id} />
                        </React.Suspense>
                    ))}
                </React.Fragment>
            ))}
        </Chakra.Wrap>
    );
}
