import * as Chakra from "@chakra-ui/react";
import { useTrackEvent } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { get_ChapterbyId, get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const Chapter_Page_Success = React.lazy(() => import("./Chapter_Page_Success"));

export default function Chapter_Page() {
    const { id } = useParams();
    const queryKey = get_chapter_queryKey({
        id: id!
    });
    const setTitle = useAppWindowTitle();
    const queryClient = useQueryClient();
    React.useEffect(() => {
        queryClient.removeQueries(queryKey, {
            exact: true
        });
        setTitle("Loading... | Mangadex");
    }, []);
    const { query } = get_ChapterbyId({
        id: id!
    });
    useTrackEvent("mangadex-chapter-page-entrance", {
        type: "chapter",
        id: id!
    });

    if (query.isError) {
        setTitle(`Error on loading chapter ${id!} | Mangadex`);
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
                            <MangadexSpinner
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
                <MangadexSpinner
                    size="xl"
                    color='orange.500'
                    thickness='4px'
                />
            </Chakra.AbsoluteCenter>
        </Chakra.Box>
    );

}
