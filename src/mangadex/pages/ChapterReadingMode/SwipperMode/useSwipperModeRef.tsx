import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { SwiperRef } from "swiper/react";

export function getUseSwipperModeRef_QueryKey(props : {
    chapter : Chapter
}){
    return `mdx-chapter-${props.chapter.get_id()}-swipper`;
}

export default function useSwipperModeRef(props : {
    chapter : Chapter,
    swipper: React.RefObject<SwiperRef>
}){
    const queryKey = getUseSwipperModeRef_QueryKey(props);
    const query = useQuery<React.RefObject<SwiperRef>>(queryKey, async () => {
        return props.swipper;
    }, {
        staleTime : Infinity
    });
    return {
        queryKey,
        query
    };
}

export function useSwipperModeRefData(props: {
    chapter : Chapter
}){
    const queryClient = useQueryClient();
    const swipperModeRef_QueryKey = getUseSwipperModeRef_QueryKey(props);
    const queryKey = `${swipperModeRef_QueryKey}-listner`;
    const query = useQuery<React.RefObject<SwiperRef>>(queryKey, async () => {
        return queryClient.getQueryData<React.RefObject<SwiperRef>>(swipperModeRef_QueryKey)!;
    }, {
        enabled : !!queryClient.getQueryData<React.RefObject<SwiperRef>>(swipperModeRef_QueryKey)
    });
    return {
        query,
        queryKey
    };
}