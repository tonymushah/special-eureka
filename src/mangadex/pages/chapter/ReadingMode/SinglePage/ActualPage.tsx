import { Image } from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import ChapterImage from "./Image";

export default function ActualPage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const [page, _setPage] = React.useState(0);
    const setPage = React.useCallback((input: number) => {
        _setPage(input);
    }, [page]);
    const { query } = useChapterPages({
        chapter: data.chapter
    });
    const ref = useHotkeys<HTMLDivElement>(["n", "m"], (kbEvent, _htEvent) => {
        console.log(kbEvent);
        if (_htEvent.ctrl != true) {
            if (_htEvent.keys?.join("").includes("n")) {
                setPage(page - 1);
            } else if (_htEvent.keys?.join("").includes("m")) {
                setPage(page + 1);
            }
        }
    });
    return (
        <React.Fragment>
            {data.images.map((url, index) => {
                if (page == index) {
                    return (
                        <ChapterImage src={url} key={url} previous_next_ref={ref}/>
                    );
                } else{
                    return (
                        <Image
                            key={url}
                            alt={url}
                            src={url}
                            display={"none"}
                        />
                    );
                }
            })}
        </React.Fragment>
    );
}