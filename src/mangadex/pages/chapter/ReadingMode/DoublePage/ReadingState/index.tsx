import { Chapter } from "@mangadex/api/structures/Chapter";
import useDoublePageChapter_ReadingStateData from "../ActualDoublePage/useDoublePageChapter_ReadingStateData";
import React from "react";
import OutDoublePageInput from "./OutDoublePageInput";
import { Skeleton } from "@chakra-ui/react";
import { _getLastInURL_ } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";

export default function ReadingState({
    chapter
} : {
    chapter : Chapter
}){
    const { state, images } = useDoublePageChapter_ReadingStateData(chapter);
    const limit_comp = React.useMemo(() => {
        const limit = state.data?.limit;
        const value = images.data?.at(((limit ?? 1) - 1) ?? 0);
        if (value != undefined) {
            if (typeof value == "string") {
                return (
                    <React.Fragment>
                        {parseInt(_getLastInURL_(value)?.match(/\d+/)?.[0] ?? "0")}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        {parseInt(_getLastInURL_(value[1])?.match(/\d+/)?.[0] ?? "0")}
                    </React.Fragment>
                );
            }
        } else {
            return (
                <Skeleton />
            );
        }

    }, [state.data?.limit, images.data]);
    if(state.isSuccess && images.isSuccess){
        return (
            <React.Fragment>
                <OutDoublePageInput value={images.data[state.data.current]}/>
                <React.Fragment>&nbsp;/&nbsp;</React.Fragment>
                {limit_comp}
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