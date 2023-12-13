import * as Chakra from "@chakra-ui/react";
import React from "react";
import { get_ChapterbyId } from "@mangadex/resources/hooks/ChapterStateHooks/get_ChapterbyId";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

const ErrorEL1 = React.lazy(() => import("../../error/ErrorEL1"));
const Chapter_Element2 = React.lazy(() => import("./Chapter_Element2"));

const Chapter_Element2_byChapID = React.memo(function Chapter_Element2_byChapID(props: {
    id: string
}) {
    const { query } = get_ChapterbyId({
        id: props.id
    });
    if (query.isLoading) {
        return (
            <Chakra.Box width={"full"}>
                <Chakra.Center>
                    <MangadexSpinner />
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
                            <MangadexSpinner />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <ErrorEL1 error={query.error} />
            </React.Suspense>
        );
    }
    return (
        <React.Suspense
            fallback={
                <Chakra.Box width={"full"}>
                    <Chakra.Center>
                        <MangadexSpinner />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            <Chapter_Element2
                chapter={query.data!.data}
            />
        </React.Suspense>
    );

});

export default Chapter_Element2_byChapID;