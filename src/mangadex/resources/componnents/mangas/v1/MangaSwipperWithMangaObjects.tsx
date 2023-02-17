import React from "react"
import { FreeMode, Mousewheel, Pagination } from "swiper"
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import MangaElementFallback from "./MangaElementFallback";
import { Swiper, SwiperSlide } from "swiper/react";
import { Manga } from "../../../../api/structures/Manga";

const MangaElementDef = React.lazy(() => import("./MangaElementDef"));

export default function MangaSwipperWithMangaObjects(props: {
    mangaArray: Array<Manga>
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
                    props.mangaArray.map((value: Manga) => (
                        <SwiperSlide
                            key={value.get_id()}
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
                                <MangaElementDef src={value} />
                            </React.Suspense>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </React.Suspense>
    )
}