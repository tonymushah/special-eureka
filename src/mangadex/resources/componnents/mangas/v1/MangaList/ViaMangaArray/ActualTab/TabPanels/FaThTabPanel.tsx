import * as Chakra from "@chakra-ui/react";
import MangaVerticalElementFallback from "../../../../MangaVerticalElementFallback";
import React from "react";
import { useMangaListSrc } from "../..";

const MangaVerticalElement = React.lazy(() => import("../../../../MangaVerticalElement"));

export function FaThTabPanel() {
    const src = useMangaListSrc();
    return (
        <Chakra.Wrap>
            {src.map((value) => (
                <Chakra.WrapItem key={value.get_id()}>
                    <React.Suspense
                        fallback={<MangaVerticalElementFallback />}
                    >
                        <MangaVerticalElement src={value} />
                    </React.Suspense>
                </Chakra.WrapItem>
            ))}
        </Chakra.Wrap>
    );
}
