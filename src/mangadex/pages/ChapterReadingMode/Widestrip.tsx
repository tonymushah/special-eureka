import * as Chakra from "@chakra-ui/react";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import { FreeMode, Keyboard } from "swiper";
import { SwiperSlide } from "swiper/react";
import { useFullScreenOptions_Query } from "../chapter/ChapterFullScreen/FullScreenOptionsProvider";
import { ChapterPage_outlet_context } from "../chapter/UseChapterOutletContext";
import SwipperMode from "./SwipperMode";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";


export default function Widestrip({ data }: {
    data: ChapterPage_outlet_context
}) {
    const fullScreenOptions = useFullScreenOptions_Query();
    const { query } = useRTLSwipperMode();
    return (
        <SwipperMode
            data={data}
            swipper_option={{
                slidesPerView: 2,
                modules: [FreeMode, Keyboard],
                keyboard: true,
                freeMode: true,
                dir: query.data ? "rtl" : undefined,
            }}
        >
            {({ images, reading_state }) => (
                <React.Fragment>
                    {
                        images.map((value, index) => (
                            <SwiperSlide onMouseOver={() => {
                                reading_state.setCurrentPage(index + 1);
                            }} key={`${data.chapter.get_id()}-${index}`}>
                                <Chakra.Container height={"100vh"}>
                                    <Chakra.Image
                                        fallback={
                                            <Chakra.Box width={"full"}>
                                                <Chakra.Center>
                                                    <MangadexSpinner
                                                        size={"xl"}
                                                        color={"orange"}
                                                        thickness={"10px"}
                                                    />
                                                </Chakra.Center>
                                            </Chakra.Box>
                                        }
                                        src={value}
                                        width={fullScreenOptions.query.data != undefined ? (fullScreenOptions.query.data.image_width != 0 ? `${fullScreenOptions.query.data.image_width}%` : "initial") : "initial"}
                                        id={`mdx-chapter-${data.chapter.get_id()}-${index + 1}`}
                                    />
                                </Chakra.Container>
                            </SwiperSlide>
                        ))
                    }
                </React.Fragment>
            )}
        </SwipperMode>

    );
}