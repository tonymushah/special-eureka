import { ChapterPage_outlet_context } from "@mangadex/pages/chapter/UseChapterOutletContext";
import SwipperMode from ".";
import { Controller, Keyboard } from "swiper";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";

export default function DoublePage({data} : {
    data : ChapterPage_outlet_context
}){
    const { query } = useRTLSwipperMode();
    if(query.isSuccess){
        return (
            <SwipperMode
                data={data}
                swipper_option={{
                    dir : query.data == true ? "rtl" : undefined,
                    slidesPerGroup : 2,
                    slidesPerView : 2,
                    modules : [Controller, Keyboard],
                    keyboard : true,
                    spaceBetween : 0,
                }}
            />
        );
    }
    return (<></>);
}