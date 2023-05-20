import { ChapterPage_outlet_context } from "@mangadex/pages/chapter/UseChapterOutletContext";
import SwipperMode from ".";
import { Controller } from "swiper";

export default function DoublePage({data} : {
    data : ChapterPage_outlet_context
}){
    return (
        <SwipperMode
            data={data}
            swipper_option={{
                slidesPerGroup : 2,
                slidesPerView : 2,
                modules : [Controller],
                controller : {
                    inverse : true
                },
            }}
        />
    );
}