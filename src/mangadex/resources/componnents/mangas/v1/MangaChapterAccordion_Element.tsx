import * as Chakra from "@chakra-ui/react";
import MangaChapter_Accordion from "@mangadex/api/internal/utils/MangaChapter_Accordion";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import { useMangaDownload_Delete } from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload_Delete";
import React from "react";
import ErrorEL1 from "../../error/ErrorEL1";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";
import MangaFallback2 from "./MangaElement2Fallback";

const MangaElementDef2_withChildren = React.lazy(() => import("./MangaElementDef2_withChildren"));
const Chapter_Element1 = React.lazy(() => import("../../chapter/v1/Chapter_Element1"));

export default function MangaChapterAccordion_Element(props: {
    src: MangaChapter_Accordion
}) {
    const mangaID = props.src.$mangaid;
    const { query } = get_manga_byId({
        mangaID: mangaID,
        options: {
            staleTime: Infinity
        }
    });
    const { download_, delete_ } = useMangaDownload_Delete({
        mangaID: mangaID
    });
    if (query.isSuccess) {
        return (
            <React.Suspense fallback={
                <MangaFallback2 />
            }>
                <MangaElementDef2_withChildren
                    src={query.data.manga}
                    isRefetching={query.isRefetching}
                    refetch={query.refetch}
                    download={download_.refetch}
                    delete={delete_.refetch}
                >
                    <Chakra.Box width={"full"}>
                        <Chakra.Stack>
                            {
                                props.src.$chapters.map((value, index) => index < 3 ? (
                                    <React.Suspense
                                        fallback={
                                            <Chakra.Box width={"full"}>
                                                <Chakra.Center>
                                                    <MangadexSpinner />
                                                </Chakra.Center>
                                            </Chakra.Box>
                                        }
                                        key={value.get_id()}
                                    >
                                        <Chapter_Element1
                                            chapter={value}
                                        />
                                    </React.Suspense>
                                ) : (<React.Fragment key={value.get_id()}></React.Fragment>))
                            }
                        </Chakra.Stack>
                    </Chakra.Box>
                </MangaElementDef2_withChildren>
            </React.Suspense>
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <MangaFallback2 />
    );
}