import * as Chakra from "@chakra-ui/react";
import MangaFallback2 from "../../../../MangaElement2Fallback";
import React from "react";
import { useMangaListSrc } from "../..";

const MangaElementDef2 = React.lazy(() => import("../../../../MangaElementDef2"));

export function FaThListTabPanel() {
    const src = useMangaListSrc();
    return (
        <Chakra.Stack>
            {src.map((value) => (
                <React.Suspense
                    fallback={<MangaFallback2 />}
                    key={value.get_id()}
                >
                    <MangaElementDef2 src={value} />
                </React.Suspense>
            ))}
        </Chakra.Stack>
    );
}
