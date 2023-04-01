import { Text } from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import useChapterReadingModeOption, { ReadingMode } from "../ChapterReadingMode/useChapterReadingModeOption";

const Long_Wide_StripPS = React.lazy(() => import("./Long_Wide_StripPS"));

const SwipperPS = React.lazy(() => import("./SwipperPS"));

export default function PageSelection(props : {
    chapter : Chapter
}){
    const current_reading_mode = useChapterReadingModeOption();
    if(current_reading_mode.query.isSuccess) {
        if(current_reading_mode.query.data == ReadingMode.Swipper){
            return (
                <React.Suspense
                    fallback={
                        <Text>Loading...</Text>
                    }
                >
                    <SwipperPS {...props}/>
                </React.Suspense>
            )
        }else{
            return (
                <React.Suspense
                    fallback={
                        <Text>Loading...</Text>
                    }
                >
                    <Long_Wide_StripPS {...props}/>
                </React.Suspense>
            )
        }
    }
    return (
        <Text>Loading...</Text>
    )
}