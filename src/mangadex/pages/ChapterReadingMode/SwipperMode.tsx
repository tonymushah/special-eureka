import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Zoom } from "swiper"
import { useChapterPageOutletContext } from "../Chapter_Page";
import 'swiper/css';
import 'swiper/css/zoom';
import { SwiperSlide, Swiper } from "swiper/react"

export default function SinglePage() {
    let data = useChapterPageOutletContext()
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
            <Swiper
                slidesPerView={1}
                zoom={true}
                centeredSlides={true}
                modules={[Zoom]}
            >
                {
                    data.images.map((value) => (
                            <SwiperSlide>
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
                                    src={value}
                                />
                            </SwiperSlide>
                    ))
                }
            </Swiper>
        </React.Suspense>
    )
}