import * as Chakra from "@chakra-ui/react";
import React from "react";
import { get_ChapterbyId, is_chapter_downloaded_with_ChapID, useChapterDownloadMutation } from "../../../hooks/ChapterStateHooks";
const ErrorEL1 = React.lazy(() => import("../../error/ErrorEL1"));
    const Chapter_Element2 = React.lazy(() => import("./Chapter_Element2"));
export default function Chapter_Element2_byChapID(props: {
    id: string
}) {
    const { query, queryKey } = get_ChapterbyId({
        id : props.id
    })
    if (query.isLoading) {
        return (
            <Chakra.Box width={"full"}>
                <Chakra.Center>
                    <Chakra.Spinner />
                </Chakra.Center>
            </Chakra.Box>
        );
    }
    if (query.isError) {
        return (
            <React.Suspense
                fallback={
                    <Chakra.Box width={"full"}>
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <ErrorEL1 error={query.error} />
            </React.Suspense>
        )
    }
    return (
        <React.Suspense
            fallback={
                <Chakra.Box width={"full"}>
                    <Chakra.Center>
                        <Chakra.Spinner />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            <Chapter_Element2
                chapter={query.data!}
            />
        </React.Suspense>
    );

}