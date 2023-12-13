import { Chapter } from "@mangadex/api/structures/Chapter";
import { get_manga_of_chapter } from "@mangadex/resources/hooks/ChapterStateHooks/get_manga_of_chapter";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementDef_WChildren from "../../mangas/v1/MangaElementDef_WChildren";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";
import Chapter_Element2 from "./Chapter_Element2";
import React from "react";

const MangaFeedElement = React.memo(function MangaFeedElement(props: {
    src: Chapter
}) {
    const { query } = get_manga_of_chapter({
        chapter: props.src
    });
    if (query.isSuccess) {
        return (
            <MangaElementDef_WChildren
                src={query.data}
                isRefetching={query.isRefetching}
            >
                <Chapter_Element2
                    chapter={props.src}
                />
            </MangaElementDef_WChildren>
        );
    }
    if (query.isError == true) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <MangaElementFallback />
    );
});

export default MangaFeedElement;