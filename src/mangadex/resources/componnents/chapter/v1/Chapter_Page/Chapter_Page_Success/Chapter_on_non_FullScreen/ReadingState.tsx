import { Skeleton } from "@chakra-ui/react";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";

const ChapterReadingState = React.lazy(() => import("../../ChapterReading_State"));

export default function ReadingState() {
    const { chapter } = usePropsChapter();
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