import * as Chakra from "@chakra-ui/react";
import MangaFallback2 from "../../../../MangaElement2Fallback";
import React from "react";
import { useMangaListByArrayMangaIDSrc } from "../..";

const MangaElementDef2_withID = React.lazy(() => import("../../../../MangaElementDef2_withID"));

export function FaThListTabPanel() {
    const src = useMangaListByArrayMangaIDSrc();
    return (
        <Chakra.Stack>
            {src.map((value) => (
                <React.Suspense
                    key={value}
                    fallback={<MangaFallback2 />}
                >
                    <Chakra.Box width={"100%"}>
                        <MangaElementDef2_withID mangaID={value} />
                    </Chakra.Box>
                </React.Suspense>
            ))}
        </Chakra.Stack>
    );
}
