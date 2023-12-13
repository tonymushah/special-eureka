import React from "react";
import * as Chakra from "@chakra-ui/react";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import "swiper/css";
import { SwiperSlide, Swiper, SwiperRef, SwiperProps } from "swiper/react";
import { useFullScreenOptions_Query } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/ChapterFullScreen/FullScreenOptionsProvider";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import useSwipperModeRef from "./useSwipperModeRef";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

type Props = {
    data: ChapterPage_outlet_context,
    swipper_option?: SwiperProps,
    children?: (props:
        {
            images: string[],
            reading_state: ReturnType<typeof useChapterPages>,
            fullScreenOptions: ReturnType<typeof useFullScreenOptions_Query>
        }
    ) => React.ReactNode
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SwipperMode = React.forwardRef<SwiperRef, Props>(function SwipperMode({ data, swipper_option, children }, _swipperRef) {
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
                    <MangadexSpinner
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
                        children == undefined ? (data.images.map((value, index) => (
                            <SwiperSlide onMouseOver={() => {
                                reading_state.setCurrentPage(index + 1);
                            }} key={`${data.chapter.get_id()}-${index}`}>
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
                            </SwiperSlide>
                        ))) :
                            children({
                                images: data.images,
                                fullScreenOptions,
                                reading_state
                            })
                    }
                </Swiper>
            </Chakra.Box>
        </React.Suspense>
    );
});

export default SwipperMode;