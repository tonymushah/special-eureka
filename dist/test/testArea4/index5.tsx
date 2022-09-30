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

let list : List = await List.getListByID("ff210dec-862b-4c17-8608-0e7f97c70488");
ReactDOM.createRoot(document.getElementById("root")!).render(<p>{"generated list"}</p>);
let array : Array<Manga> = await (list).build_and_get_mangaArray();

ReactDOM.createRoot(document.getElementById("root")!).render(<Manga_swipper src={array}></Manga_swipper>);