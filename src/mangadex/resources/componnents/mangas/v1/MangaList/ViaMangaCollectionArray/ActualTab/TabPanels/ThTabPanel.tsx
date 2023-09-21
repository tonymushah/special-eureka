import * as Chakra from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import MangaVerticalElementFallback from "../../../../MangaVerticalElementFallback";
import { useMangaListWithCollectionArraySrc } from "../..";

const MangaVerticalElement = React.lazy(() => import("../../../../MangaVerticalElement"));

export function ThTabPanel() {
    const src = useMangaListWithCollectionArraySrc();
    return (
        <Chakra.TabPanel
            as={motion.div}
            key={"Th"}
            padding={"5px"}
        >
            <Chakra.Wrap>
                {src.map((value, index) => (
                    <React.Fragment key={`ThTabPanel-${value.get_offset()}-${value.get_limit()}-${index}-3`}>
                        {value.get_data().map((value, index) => (
                            <Chakra.WrapItem
                                key={`${value.get_id()}-${index}-3`}
                            >
                                <React.Suspense
                                    fallback={<MangaVerticalElementFallback />}
                                >
                                    <MangaVerticalElement src={value} />
                                </React.Suspense>
                            </Chakra.WrapItem>
                        ))}
                    </React.Fragment>
                ))}
            </Chakra.Wrap>
        </Chakra.TabPanel>
    );
}
