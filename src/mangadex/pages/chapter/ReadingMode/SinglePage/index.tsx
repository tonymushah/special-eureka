import { Mangadex_suspense__ } from "@mangadex/index";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import ActualPage from "./ActualPage";

export default function SinglePage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const { query } = useRTLSwipperMode();
    if (query.isSuccess) {
        return (
            <React.Fragment>
                <ActualPage data={data}/>
            </React.Fragment>
        );
    } else {
        return (<Mangadex_suspense__ />);
    }
}