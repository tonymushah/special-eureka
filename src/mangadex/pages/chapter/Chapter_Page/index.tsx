import * as Chakra from "@chakra-ui/react";
import { useTrackEvent } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { get_ChapterbyId } from "@mangadex/resources/hooks/ChapterStateHooks/get_ChapterbyId";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import React from "react";
import { useParams } from "@router";

const Chapter_Page_Success = React.lazy(() => import("@mangadex/resources/componnents/chapter/v1/Chapter_Page/Chapter_Page_Success"));

export default function Chapter_Page() {
    const { id } = useParams("/mangadex/chapter/:id");
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Loading... | Mangadex");
    }, []);
    const { query } = get_ChapterbyId({
        id: id!,
        options: {
            enabled: !!id
        }
    });
    useTrackEvent("mangadex-chapter-page-entrance", {
        type: "chapter",
        id: id!
    });

    if (query.isError) {
        setTitle(`Error on loading chapter ${id} | Mangadex`);
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

export { loader } from "./loader";
