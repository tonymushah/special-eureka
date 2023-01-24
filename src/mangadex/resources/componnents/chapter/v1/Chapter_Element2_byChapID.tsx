import React from "react";
import { useQuery } from "react-query";
import { Chapter } from "../../../../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";

export default function Chapter_Element2_byChapID(props: {
    id: string
}) {
    const client = useHTTPClient();
    const query = useQuery<Chapter, Error>("mdx-chapter:" + props.id, () => {
        return Chapter.get_ChapterbyId(props.id, client);
    }, {
        staleTime: Infinity
    })
    const ErrorEL1 = React.lazy(() => import("../../error/ErrorEL1"));
    const Chapter_Element2 = React.lazy(() => import("./Chapter_Element2"));
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