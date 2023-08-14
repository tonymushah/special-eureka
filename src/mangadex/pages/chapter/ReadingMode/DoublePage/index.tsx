import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import SwipperMode from "../SwipperMode";
import { Controller, Keyboard } from "swiper";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { SwiperSlide } from "swiper/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useQuery } from "@tanstack/react-query";
import { getImageSize } from "react-image-size";

export type DoublePageImageInput = [string, string] | string;

export default function DoublePage({ data }: {
    data: ChapterPage_outlet_context
}) {
    const [, startTranstion] = React.useTransition();
    const query = useQuery<DoublePageImageInput[]>(["mdx", "chapter", data.chapter.get_id(), "images", "size"], async () => {
        const images: Array<DoublePageImageInput> = [];
        for (let index = 1; index < data.images.length; index++) {
            const currentElement = data.images[index];
            const previousCurrentElement: string | undefined = (index - 1) >= 0 ? data.images[index - 1] : undefined;
            const lastElement: DoublePageImageInput | undefined = (images.length != 0) ? data.images[data.images.length - 1] : undefined;
            if (lastElement != undefined) {
                if (previousCurrentElement != undefined && !lastElement.includes(previousCurrentElement)) {
                    const currentElementSize = await getImageSize(currentElement);
                    const previousElementSize = await getImageSize(previousCurrentElement);
                    const currentElementRatio = currentElementSize.width / currentElementSize.height;
                    const previousElementRatio = previousElementSize.width / previousElementSize.height;
                    if (currentElementRatio >= 1) {
                        images.push(currentElement);
                    } else if (currentElementRatio < 1 && previousElementRatio < 1) {
                        images.push([currentElement, previousCurrentElement]);
                    }
                }
            }
        }
        return images;
    });
    if(query.isLoading)
    return (
        <React.Fragment />
    );
}