import * as Chakra from "@chakra-ui/react";
import React from "react";
import MangaFallback2 from "../../../../MangaElement2Fallback";
import { useMangaListWithCollectionArraySrc } from "../..";

const MangaElementDef2 = React.lazy(() => import("../../../../MangaElementDef2"));

export function ThListTabPanel() {
    const src = useMangaListWithCollectionArraySrc();
    return (
        <Chakra.TabPanel
            key={"ThList"}
            padding={"5px"}
        >
            <Chakra.Stack>
                {src.map((value, index) => (
                    <React.Fragment key={`ThListTabPanel-${value.get_offset()}-${value.get_limit()}-${index}-1`}>
                        {value.get_data().map((value, index) => (
                            <React.Suspense
                                fallback={<MangaFallback2 />}
                                key={`${value.get_id()}-${index}-1`}
                            >
                                <MangaElementDef2 src={value} />
                            </React.Suspense>
                        ))}
                    </React.Fragment>
                ))}
            </Chakra.Stack>
        </Chakra.TabPanel>
    );
}
