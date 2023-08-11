import { HStack, Text } from "@chakra-ui/react";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";
import React from "react";
import useChapterReadingModeOption from "../ChapterReadingMode/useChapterReadingModeOption";

const DirectionSelection = React.lazy(() => import("../DirectionSelection"));

export default function Direction() {
    const reading_mode = useChapterReadingModeOption();
    if (reading_mode.query.data != ReadingMode.LongStrip) {
        return (
            <HStack>
                <Text as={"span"}>Direction : </Text>
                <React.Suspense>
                    <DirectionSelection />
                </React.Suspense>
            </HStack>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}