import MangaChapter_Accordion from "../../../../api/internal/utils/MangaChapter_Accordion";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Manga } from "../../../../api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFallback2 from "./MangaElement2Fallback";
import * as Chakra from "@chakra-ui/react"
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { get_manga_byId, useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";

const MangaElementDef2_withChildren = React.lazy(() => import("./MangaElementDef2_withChildren"));
const Chapter_Element1 = React.lazy(() => import("../../chapter/v1/Chapter_Element1"))


export default function MangaChapterAccordion_Element(props: {
    src: MangaChapter_Accordion
}) {
    const mangaID = props.src.$mangaid;
    const { query } = get_manga_byId({
        mangaID : mangaID,
        options : {
            staleTime : Infinity
        }
    })
    const { download_, delete_ } = useMangaDownload_Delete({
        mangaID : mangaID
    })
    if (query.isLoading) {
        return (
            <MangaFallback2 />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <React.Suspense fallback={
            <MangaFallback2 />
        }>
            <MangaElementDef2_withChildren
                src={query.data!}
                isRefetching={query.isRefetching}
                refetch={query.refetch}
                download={download_.mutate}
                delete={delete_.mutate}
            >
                <Chakra.Box width={"full"}>
                <Chakra.Stack>
                {
                    props.src.$chapters.map((value) => (
                        <React.Suspense
                            fallback={
                                <Chakra.Box width={"full"}>
                                    <Chakra.Center>
                                        <Chakra.Spinner />
                                    </Chakra.Center>
                                </Chakra.Box>
                            }
                        >
                            <Chapter_Element1
                                chapter={value}
                            />
                        </React.Suspense>
                    ))
                }
                </Chakra.Stack>
                </Chakra.Box>
            </MangaElementDef2_withChildren>
        </React.Suspense>

    )
}