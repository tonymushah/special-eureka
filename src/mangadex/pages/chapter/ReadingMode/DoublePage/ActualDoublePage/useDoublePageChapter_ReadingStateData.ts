import { Chapter } from "@mangadex/api/structures/Chapter";
import { QueryKey, useQuery } from "@tanstack/react-query";
import React from "react";
import { queryKey as ImageQueryKey, QueryData as ImagesQueryData } from "../hooks/useDoublePageImageQuery";
import { query_key, DoublePageImageQueryData } from "./hooks";

export default function useDoublePageChapter_ReadingStateData(chapter: Chapter) {
    const { state, images } = React.useMemo<{
        state: QueryKey;
        images: QueryKey;
    }>(() => {
        return {
            state: query_key(chapter),
            images: ImageQueryKey(chapter)
        };
    }, []);
    const state_queryData = useQuery<DoublePageImageQueryData>(state, {
        enabled: false,
    });
    const images_queryData = useQuery<ImagesQueryData>(images, {
        enabled: false
    });
    return {
        state: state_queryData,
        images: images_queryData,
        isStateFetching : state_queryData.isLoading,
        isImageFetching : images_queryData.isLoading
    };
}
