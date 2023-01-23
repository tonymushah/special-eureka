import MangaChapter_Accordion from "../../../../api/internal/utils/MangaChapter_Accordion";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Manga } from "../../../../api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFallback2 from "./MangaElement2Fallback";
import * as Chakra from "@chakra-ui/react"

const MangaElementDef2_withChildren = React.lazy(() => import("./MangaElementDef2_withChildren"));
const Chapter_Element1 = React.lazy(() => import("../../chapter/v1/Chapter_Element1"))


export default function MangaChapterAccordion_Element(props: {
    src: MangaChapter_Accordion
}) {
    const mangaID = props.src.$mangaid;
    const toast = useToast({
        position: "bottom-right"
    });
    const queryClient = useQueryClient();
    const key = "mdx-manga:" + mangaID;
    const query = useQuery<Manga, Error>(key, () => {
        return Manga.getMangaByID(mangaID);
    }, {
        "staleTime": Infinity
    });
    const delete_ = useMutation({
        mutationFn: () => {
            toast({
                position: "bottom-right",
                title: "Deleting manga...",
                status: "loading",
                duration: 9000,
                isClosable: true
            });
            return query.data!.delete_this()
        },
        onSuccess: () => {
            toast({
                position: "bottom-right",
                title: "Deleted manga",
                status: "success",
                duration: 9000,
                isClosable: true
            })
            queryClient.removeQueries({
                queryKey: key
            })
        },
        onError(error: any, variables, context) {
            toast({
                position: "bottom-right",
                title: "Error on deleting manga",
                status: "error",
                description: error.message,
                variant: "solid",
                duration: 9000,
                isClosable: true
            })
        },
    });
    const download_ = useMutation({
        mutationFn: () => {
            toast({
                title: "Downloading manga...",
                status: "loading",
                duration: 9000
            });
            return Manga.download_manga(query.data!.get_id())
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: key
            })
        },
        onError(error: Error, variables, context) {
            toast({
                position: "bottom-right",
                title: "Error on downloading manga",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true
            })
        },
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