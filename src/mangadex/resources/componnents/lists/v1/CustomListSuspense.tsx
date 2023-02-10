import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import React from "react";
import { FreeMode } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";

export default function CustomListSwiperSuspense() {
    return (
        <Swiper
            slidesPerGroupAuto={true}
            slidesPerView={"auto"}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
        >
            {
                [0, 1, 2].map((value, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            display: "inline-block",
                            width: "min-content"
                        }}
                    >
                        <MangaElementFallback />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}