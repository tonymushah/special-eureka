import { ChapterPage_outlet_context } from "@mangadex/pages/chapter/UseChapterOutletContext";
import SwipperMode from ".";
import { Keyboard, Zoom } from "swiper";
import "swiper/css/zoom";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";

export default function SinglePage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const { query } = useRTLSwipperMode();
    if(query.isSuccess){
    return (
        <SwipperMode
            data={data}
            swipper_option={{
                slidesPerView: 1,
                zoom: true,
                centeredSlides: true,
                modules: [Zoom, Keyboard],
                keyboard: true,
            }}
        />
    );
        }
    return (<React.Fragment/>);
}