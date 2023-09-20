import * as Chakra from "@chakra-ui/react";
import React from "react";
import MangaElementFallback from "../../../../MangaElementFallback";
import { useMangaListWithCollectionArraySrc } from "../..";

const MangaElementDef = React.lazy(() => import("../../../../MangaElementDef"));

export function ThLargeTabPanel() {
    const src = useMangaListWithCollectionArraySrc();
    return (
        <Chakra.TabPanel
            key={"ThLarge"}
            padding={"5px"}
        >
            <Chakra.Wrap>
                {src.map((value, index) => (
                    <React.Fragment key={`ThLargeTabPanel-${value.get_offset()}-${value.get_limit()}-${index}-2`}>
                        {value.get_data().map((value, index) => (
                            <Chakra.WrapItem
                                key={`${value.get_id()}-${index}-2`}
                            >
                                <React.Suspense
                                    fallback={<MangaElementFallback />}
                                >
                                    <MangaElementDef src={value} />
                                </React.Suspense>
                            </Chakra.WrapItem>
                        ))}
                    </React.Fragment>
                ))}
            </Chakra.Wrap>
        </Chakra.TabPanel>
    );
}
