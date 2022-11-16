import React, { Suspense, useCallback } from "react"
import { Carousel, Row, Spinner } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactDOM from 'react-dom/client';
import { Manga3, Manga3TEST, Manga_swipper } from "./Manga_State1";
import { Pagination, Autoplay, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { List } from "../../mangadex/api/structures/List";
import { Cover } from "../../mangadex/api/structures/Cover";
import { Alt_title } from '../../mangadex/api/internal/Utils';
import { Manga } from "../../mangadex/api/structures/Manga";
import { Await } from "react-router-dom";
import { Api_Request } from "../../mangadex/api/internal/Api_Request";
import { Response, getClient } from "@tauri-apps/api/http";
const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<p>{"generating list"}</p>);
let list: List = await List.getListByID("4be9338a-3402-4f98-b467-43fb56663927");
//var cover = await list.get_manga_array()[0].get_cover_art();
//root.render(<p>{JSON.stringify(cover)}</p>)
root.render(
    <React.Suspense fallback={<Spinner animation="border"></Spinner>}>
        <Await
            resolve={list.build_and_get_mangaArray()}
            errorElement={<p>Error ON build Array</p>}
            children={(getted : Array<Manga>) => {
                return (<Manga_swipper src={getted}></Manga_swipper>);
            }}
        />
            
    </React.Suspense>
);