import { Chapter } from "@mangadex/api/structures/Chapter";
import useDoublePageChapter_ReadingStateData from "../ActualDoublePage/useDoublePageChapter_ReadingStateData";
import React from "react";
import { DoublePageImageInput } from "../hooks/useDoublePageImageQuery";

export function OutDoublePageInput({ value } : {
    value : DoublePageImageInput
}){
    
}

export default function ReadingState({
    chapter
} : {
    chapter : Chapter
}){
    const { state, images } = useDoublePageChapter_ReadingStateData(chapter);
    if(state.isSuccess && images.isSuccess){
        return (
            <React.Fragment>
                {
                    ((typeof (images.data.at(state.data.current))) == "string") ? (
                        ()
                    ) : ()
                }
            </React.Fragment>
        );
    }else{
        return (
            <React.Fragment>
                1 / ??
            </React.Fragment>
        );
    }
}