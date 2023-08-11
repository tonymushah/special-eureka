import { Text } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import useChapterReadingModeOption from "../ChapterReadingMode/useChapterReadingModeOption";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";


const Long_Wide_StripPS = React.lazy(() => import("./Long_Wide_StripPS"));

const SwipperPS = React.lazy(() => import("./SwipperPS"));

const SinglePage = React.lazy(() => import("@mangadex/pages/chapter/ReadingMode/SinglePage/PageSelection"));

export default function PageSelection(props: {
    chapter: Chapter
}) {
    const current_reading_mode = useChapterReadingModeOption();
    if (current_reading_mode.query.isSuccess) {
        if (current_reading_mode.query.data == ReadingMode.SinglePage) {
            return (
                <React.Suspense
                    fallback={
                        <Text>Loading...</Text>
                    }
                >
                    <SinglePage {...props} />
                </React.Suspense>
            );
        } else if (current_reading_mode.query.data == ReadingMode.DoublePage) {
            return (
                <React.Suspense
                    fallback={
                        <Text>Loading...</Text>
                    }
                >
                    <SwipperPS {...props} />
                </React.Suspense>
            );
        } else {
            return (
                <React.Suspense
                    fallback={
                        <Text>Loading...</Text>
                    }
                >
                    <Long_Wide_StripPS {...props} />
                </React.Suspense>
            );
        }
    }
    return (
        <Text>Loading...</Text>
    );
}