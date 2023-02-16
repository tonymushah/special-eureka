import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Chapter } from "../../../../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react"
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { get_ChapterbyId, is_chapter_downloaded_with_ChapID, useChapterDownloadMutation } from "../../../hooks/ChapterStateHooks";
const ErrorEL1 = React.lazy(() => import("../../error/ErrorEL1"));
const Chapter_Element1 = React.lazy(() => import("./Chapter_Element1"));
export default function Chapter_Element1_byChapID(props: {
    id: string,
    with_all_includes?: boolean
}) {
    const { query, queryKey } = get_ChapterbyId({
        id : props.id,
        with_all_includes : props.with_all_includes
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
            <Chapter_Element1
                chapter={query.data!.data}
            />
        </React.Suspense>
    );
    
}