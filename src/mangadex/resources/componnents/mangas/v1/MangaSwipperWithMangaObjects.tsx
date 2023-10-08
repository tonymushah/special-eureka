import Manga from "@mangadex/api/structures/Manga";
import React from "react";
import { FreeMode, Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import MangaElementFallback from "./MangaElementFallback";
import MangaVerticalElementFallback from "./MangaVerticalElementFallback";

const MangaElementDef = React.lazy(() => import("./MangaElementDef"));

const MangaVerticalElement = React.lazy(() => import("./MangaVerticalElement"));

export default function MangaSwipperWithMangaObjects(props: {
    mangaArray: Array<Manga>,
    isVertical?: boolean
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
                                width: "min-content",
                                padding: "10px"
                            }}
                        >
                            {
                                props.isVertical == true ? (
                                    <React.Suspense
                                        fallback={
                                            <MangaVerticalElementFallback />
                                        }
                                    >
                                        <MangaVerticalElement
                                            src={value}
                                        />
                                    </React.Suspense>
                                ) : (
                                    <React.Suspense
                                        fallback={
                                            <MangaElementFallback />
                                        }
                                    >
                                        <MangaElementDef src={value} />
                                    </React.Suspense>
                                )
                            }
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </React.Suspense>
    );
}