import React, { Suspense, useCallback } from "react"
import { Carousel, Row, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactDOM from 'react-dom/client';
import { Manga3, Manga3TEST } from "./Manga_State1";
import { Pagination, Autoplay, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { List } from "../../mangadex/api/structures/List";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Alt_title } from '../../mangadex/api/internal/Utils';
import { Manga } from "../../mangadex/api/structures/Manga";
import { Await } from "react-router-dom";
import { Api_Request } from "../../mangadex/api/internal/Api_Request";

ReactDOM.createRoot(document.getElementById("root")!).render(
        <Swiper
            spaceBetween={0}
            slidesPerView={3}
            pagination={{
                dynamicBullets: true,
            }}
            autoplay={{
                delay: 2500,
            disableOnInteraction: false,
            }}
            mousewheel={true}
            loop={true}
            modules={[Pagination, Autoplay, Mousewheel]}
            breakpoints={
                {
                    576:{
                        slidesPerView : 4,
                        spaceBetween : 10
                    },
                    768:{
                        slidesPerView : 5,
                        spaceBetween : 10
                    },
                    992:{
                        slidesPerView : 3,
                        spaceBetween : 10
                    }
                }
            }
        >
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
            <SwiperSlide>
                <Manga3TEST/>
            </SwiperSlide>
        </Swiper>
);