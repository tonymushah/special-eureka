import { Chapter } from "@mangadex/api/structures/Chapter";
import useDoublePageChapter_ReadingStateData from "../ActualDoublePage/useDoublePageChapter_ReadingStateData";
import React from "react";
import OutDoublePageInput from "./OutDoublePageInput";

export default function ReadingState({
    chapter
} : {
    chapter : Chapter
}){
    const { state, images } = useDoublePageChapter_ReadingStateData(chapter);
    if(state.isSuccess && images.isSuccess){
        return (
            <OutDoublePageInput value={images.data[state.data.current]}/>
        );
    }else{
        return (
            <React.Fragment>
                1 / ??
            </React.Fragment>
        );
    }
}