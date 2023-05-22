import React from "react";
import * as Chakra from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "../../chapter/UseChapterOutletContext";
import "swiper/css";
import { SwiperSlide, Swiper, SwiperRef, SwiperProps } from "swiper/react";
import { useFullScreenOptions_Query } from "../../chapter/ChapterFullScreen/FullScreenOptionsProvider";
import useChapterPages from "../../chapter/useChapterPages";
import useSwipperModeRef from "./useSwipperModeRef";

export default function SwipperMode({ data, swipper_option }: {
    data: ChapterPage_outlet_context,
    swipper_option?: SwiperProps
}) {
    const fullScreenOptions = useFullScreenOptions_Query();
    const reading_state = useChapterPages({
        chapter: data.chapter
    });
    const swipperRef = React.createRef<SwiperRef>();
    useSwipperModeRef({
        chapter: data.chapter,
        swipper: swipperRef
    });
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Spinner
                        size={"xl"}
                        color={"orange.500"}
                    />
                </Chakra.AbsoluteCenter>
            }
        >
            <Chakra.Box id="top-chap-view">
                <Swiper
                    onSlideChange={() => {
                        document.getElementById("top-chap-view")?.scrollIntoView();
                    }}
                    ref={swipperRef}
                    onKeyDown={(e) => {
                        if (e.key == "ArrowLeft") {
                            swipperRef.current?.swiper.slidePrev();
                        }
                        if (e.key == "ArrowRight") {
                            swipperRef.current?.swiper.slideNext();
                        }
                    }}
                    {...swipper_option}
                >
                    {
                        data.images.map((value, index) => (
                            <SwiperSlide onMouseOver={() => {
                                reading_state.setCurrentPage(index + 1);
                            }} key={`${data.chapter.get_id()}-${index}`}>
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
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Chakra.Box>
        </React.Suspense>
    );
}