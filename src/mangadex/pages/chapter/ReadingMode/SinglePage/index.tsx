import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import SwipperMode from "../SwipperMode";
import { Keyboard } from "swiper";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import { SwiperSlide } from "swiper/react";
import * as Chakra from "@chakra-ui/react";
import { Mangadex_suspense__ } from "@mangadex/index";
import { useFullScreenOptions_Query } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/ChapterFullScreen/FullScreenOptionsProvider";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

export default function SinglePage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const fullScreenOptions = useFullScreenOptions_Query();
    const { query } = useRTLSwipperMode();
    if (query.isSuccess) {
        return (
            <SwipperMode
                data={data}
                swipper_option={{
                    slidesPerView: 1,
                    modules: [Keyboard],
                    keyboard: true,
                    dir: query.data ? "rtl" : undefined,
                    centeredSlides: true
                }}
            >
                {({ images, reading_state }) => (
                    <React.Fragment>
                        {
                            images.map((value, index) => (
                                <SwiperSlide onMouseOver={() => {
                                    reading_state.setCurrentPage(index + 1);
                                }} key={`${data.chapter.get_id()}-${index}`}>
                                    <ChakraContainer>
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
                                            width={fullScreenOptions.query.data != undefined ? (fullScreenOptions.query.data.image_width != 0 ? `${fullScreenOptions.query.data.image_width}%` : "initial") : "initial"}
                                            src={value}
                                            id={`mdx-chapter-${data.chapter.get_id()}-${index + 1}`}
                                        />
                                    </ChakraContainer>
                                </SwiperSlide>
                            ))
                        }
                    </React.Fragment>
                )}
            </SwipperMode>
        );
    } else {
        return (<Mangadex_suspense__ />);
    }
}