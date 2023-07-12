import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import { get_ChapterbyId, get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks";
import { trackEvent, useTrackEvent } from "@mangadex/index";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";

const Chapter_Page_Success = React.lazy(() => import("./Chapter_Page_Success"));

export default function Chapter_Page() {
    const { id } = useParams();
    const queryKey = get_chapter_queryKey({
        id: id!
    });
    const queryClient = useQueryClient();
    React.useMemo(() => {
        queryClient.removeQueries(queryKey, {
            exact: true
        });
    }, []);
    const { query } = get_ChapterbyId({
        id: id!
    });
    useTrackEvent("mangadex-chapter-page-entrance", {
        type: "chapter",
        id: id!
    });
    useAppWindowTitle("Loading... | Mangadex");
    if (query.isError) {
        useAppWindowTitle(`Error on loading chapter ${id!} | Mangadex`);
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    if (query.isSuccess) {
        return (
            <React.Suspense
                fallback={
                    <Chakra.Box
                        display={"block"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Spinner
                                size="xl"
                                color='orange.500'
                                thickness='4px'
                            />
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                }
            >
                <Chapter_Page_Success
                    data={query.data.data}
                />
            </React.Suspense>
        );
    }
    return (
        <Chakra.Box
            display={"block"}
        >
            <Chakra.AbsoluteCenter>
                <Chakra.Spinner
                    size="xl"
                    color='orange.500'
                    thickness='4px'
                />
            </Chakra.AbsoluteCenter>
        </Chakra.Box>
    );

}
