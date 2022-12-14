import React from "react"
import { Autoplay, FreeMode, Mousewheel, Pagination } from "swiper"
import { SwiperSlide, Swiper } from "swiper/react"
import MangaElementDef_wID from "../../mangas/v1/MangaElementDef_wID"
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function MangaSwipper(props : {
    mangaIDS : Array<string>
}) {
    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            grabCursor={true}
            mousewheel={true}
            autoplay={true}
            modules={[Pagination, Autoplay, Mousewheel, FreeMode]}
            breakpoints={
                {
                    374: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    535: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    733: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    786: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1222: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1300: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    }
                }
            }
        >
            {
                props.mangaIDS.map((value : string) => (
                    <SwiperSlide
                        key={value}
                    >
                        <MangaElementDef_wID mangaID={value}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}