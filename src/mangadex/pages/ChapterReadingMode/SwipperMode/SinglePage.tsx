import { ChapterPage_outlet_context } from "@mangadex/pages/chapter/UseChapterOutletContext";
import SwipperMode from ".";
import { Keyboard, Zoom } from "swiper";
import "swiper/css/zoom";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import { SwiperSlide } from "swiper/react";
import * as Chakra from "@chakra-ui/react";
import { Mangadex_suspense__ } from "@mangadex";

export default function SinglePage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const { query } = useRTLSwipperMode();
    if (query.isSuccess) {
        return (
            <SwipperMode
                data={data}
                swipper_option={{
                    slidesPerView: 1,
                    zoom: true,
                    centeredSlides: true,
                    modules: [Zoom, Keyboard],
                    keyboard: true,
                    dir: query.data ? "rtl" : undefined
                }}
            >
                {({ images, reading_state, fullScreenOptions }) => (
                    <React.Fragment>
                        {
                            images.map((value, index) => (
                                <SwiperSlide onMouseOver={() => {
                                    reading_state.setCurrentPage(index + 1);
                                }} key={`${data.chapter.get_id()}-${index}`}>
                                    <Chakra.Container>
                                        <Chakra.Image
                                            fallback={
                                                <Chakra.Box width={"full"}>
                                                    <Chakra.Center>
                                                        <Chakra.Spinner
                                                            size={"xl"}
                                                            color={"orange"}
                                                            thickness={"10px"}
                                                        />
                                                    </Chakra.Center>
                                                </Chakra.Box>
                                            }
                                            width={fullScreenOptions.query.data != undefined ? (fullScreenOptions.query.data.image_width != 0 ? `${fullScreenOptions.query.data.image_width}%` : "initial") : "initial"}
                                            src={value}
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
    }else{
        return (<Mangadex_suspense__/>);
    }
}