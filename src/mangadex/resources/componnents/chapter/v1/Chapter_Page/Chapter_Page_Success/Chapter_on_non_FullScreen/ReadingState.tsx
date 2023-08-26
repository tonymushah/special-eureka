import { Skeleton } from "@chakra-ui/react";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";
import useChapterReadingModeOption from "../../ChapterReadingMode/useChapterReadingModeOption";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";

const ChapterReadingState = React.lazy(() => import("../../ChapterReading_State"));

const DoublePageChapterReadingState = React.lazy(() => import("@mangadex/pages/chapter/ReadingMode/DoublePage/ReadingState"));

export default function ReadingState() {
    const { chapter } = usePropsChapter();
    const readingMode = useChapterReadingModeOption();
    if (readingMode.query.data == ReadingMode.DoublePage) {
        return (
            <React.Suspense
                fallback={
                    <Skeleton
                        width={"100%"}
                        height={"10px"}
                    />
                }
            >
                <DoublePageChapterReadingState chapter={chapter}/>
            </React.Suspense>
        );
    } else {
        return (
            <React.Suspense
                fallback={
                    <Skeleton
                        width={"100%"}
                        height={"10px"}
                    />
                }
            >
                <ChapterReadingState chapter={chapter} />
            </React.Suspense>
        );
    }
}