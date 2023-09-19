import * as Chakra from "@chakra-ui/react";
import MangaFallback2 from "../../../../MangaElement2Fallback";
import React from "react";
import { useMangaListByCollectionArrayMangaIDSrc } from "../..";

const MangaElementDef2_withID = React.lazy(() => import("../../../../MangaElementDef2_withID"));

export function FaThListTabPanel() {
    const src = useMangaListByCollectionArrayMangaIDSrc();
    return (
        <Chakra.Stack>
            {src.map((value) => (
                <React.Fragment key={`${JSON.stringify(value)}-1`}>
                    {value.get_data().map((id) => (
                        <React.Suspense
                            key={`${id}-1`}
                            fallback={<MangaFallback2 />}
                        >
                            <MangaElementDef2_withID mangaID={id} />
                        </React.Suspense>
                    ))}
                </React.Fragment>
            ))}
        </Chakra.Stack>
    );
}
