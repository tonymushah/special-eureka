import { ChapterPage_outlet_context } from "@mangadex/pages/chapter/UseChapterOutletContext";
import SwipperMode from ".";
import { Keyboard, Zoom } from "swiper";
import "swiper/css/zoom";

export default function SinglePage({ data }: {
    data: ChapterPage_outlet_context
}) {
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