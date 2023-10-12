import { HStack } from "@chakra-ui/react";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";
import React from "react";
import useChapterReadingModeOption from "../ChapterReadingMode/useChapterReadingModeOption";

const ImageWidthSlider = React.lazy(() => import("../ChapterFullScreen/ImageWidthSlider"));


export default function ImageWidthController() {
    const reading_mode = useChapterReadingModeOption();
    if (reading_mode.query.data == ReadingMode.LongStrip || reading_mode.query.data == ReadingMode.WideStrip) {
        return (
            <HStack
                mt={3}
                spacing={"2px"}
            >
                <React.Suspense>
                    <ImageWidthSlider />
                </React.Suspense>
            </HStack>
        );
    } else {
        return (<React.Fragment />);
    }
}