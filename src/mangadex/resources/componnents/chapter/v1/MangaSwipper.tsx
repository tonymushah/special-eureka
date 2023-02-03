import React from "react"
import { Autoplay, FreeMode, Mousewheel, Pagination } from "swiper"
import MangaElementDef_wID from "../../mangas/v1/MangaElementDef_wID"
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MangaSwipper(props: {
    mangaIDS: Array<string>
}) {
    return (
        <React.Suspense>
            <Swiper
                slidesPerView={"auto"}
                slidesPerGroupAuto={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                grabCursor={true}
                mousewheel={true}
                freeMode={true}
                modules={[Pagination, Mousewheel, FreeMode]}
            >
                {
                    props.mangaIDS.map((value: string) => (
                        <SwiperSlide
                            key={value}
                            style={{
                                display: "inline-block",
                                width: "min-content"
                            }}
                        >
                            <React.Suspense
                                fallback={
                                    <MangaElementFallback />
                                }
                            >
                                <MangaElementDef_wID mangaID={value} />
                            </React.Suspense>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </React.Suspense>
    )
}