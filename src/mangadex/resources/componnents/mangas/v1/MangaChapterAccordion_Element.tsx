import * as Chakra from "@chakra-ui/react";
import MangaChapter_Accordion from "@mangadex/api/internal/utils/MangaChapter_Accordion";
import get_manga_byId from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import useMangaDownload_Delete from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload_Delete";
import React from "react";
import ErrorEL1 from "../../error/ErrorEL1";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";
import MangaFallback2 from "./MangaElement2Fallback";
import CollapseHeight from "../Mainpage/Top_chap/utils/CollapseHeight";

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
    const [showed, inCollapse] = React.useMemo(() => {
        const chapters = props.src.$chapters;
        if (chapters.length > 3) {
            const showed_ = chapters.splice(0, 3);
            const inCollapse_ = chapters.splice(4);
            return [showed_, inCollapse_];
        } else {
            return [chapters, undefined];
        }
    }, [props.src]);
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
                        <Chakra.VStack spacing={1} display={"block"}>
                            {
                                showed.map((value) => (
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
                                ))
                            }
                        </Chakra.VStack>
                        {
                            inCollapse != undefined ? (
                                <CollapseHeight>
                                    <Chakra.VStack spacing={1} display={"block"}>
                                        {
                                            inCollapse.map((value) => (
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
                                            ))
                                        }
                                    </Chakra.VStack>
                                </CollapseHeight>
                            ) : (
                                <React.Fragment />
                            )
                        }
                    </Chakra.Box>
                </MangaElementDef2_withChildren>
            </React.Suspense >
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