import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import SwipperMode from "../SwipperMode";
import { Controller, Keyboard } from "swiper";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { SwiperSlide } from "swiper/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useQuery } from "@tanstack/react-query";

export default function DoublePage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const [, startTranstion] = React.useTransition();
    const query = useQuery(["mdx", "chapter", data.chapter.get_id(), "images", "size"], async () => {
        
    });
    return (
        <React.Fragment/>
    );
}