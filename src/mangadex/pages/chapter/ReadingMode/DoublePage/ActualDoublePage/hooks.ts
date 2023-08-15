import { Chapter } from "@mangadex/api/structures/Chapter";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ActualDoublePageProps } from ".";
import { useDoublePageProps } from "../Provider";
import { HotkeyCallback } from "react-hotkeys-hook";
import { useStoryBookRTLSwipperMode } from "@mangadex/resources/storybook/hooks/user-option/RTLMode";
import useDoublePageReadingState from "./useDoublePageReadingState";

export type DoublePageImageQueryData = {
    current: number,
    limit?: number
};

export function query_key(chapter: Chapter): QueryKey {
    return ["mdx", "chapter", chapter.get_id(), "reading-state", "double-page"];
}

export function useDoublePageReadingStateMutation(chapter: Chapter) {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(input_: number) {
            const query_key_ = query_key(chapter);
            const queryData = queryClient.getQueryData<DoublePageImageQueryData>(query_key_);
            if (queryData != undefined) {
                const { limit } = queryData;
                queryClient.setQueryData<DoublePageImageQueryData>(query_key_, {
                    current: input_,
                    limit
                });
            }
        },
        mutationKey: query_key(chapter).concat("mutation"),
        networkMode: "offlineFirst"
    });
}

export default function useState({ images }: ActualDoublePageProps) {
    const data = useDoublePageProps();
    const [, startTransition] = React.useTransition();
    const pageQuery = useDoublePageReadingState({
        data
    });
    const rtlMode = useStoryBookRTLSwipperMode();
    const page = React.useMemo(() => {
        return pageQuery.data.current;
    }, [pageQuery.data]);
    const mutation = useDoublePageReadingStateMutation(data.chapter);
    const setPage = React.useCallback((input: number) => {
        startTransition(() => {
            mutation.mutate(input);
        });
    }, [page]);
    const onNext = React.useCallback<HotkeyCallback>(() => {
        startTransition(() => {
            if (page >= 0 && page < (images.length - 1)) {
                setPage(page + 1);
            }
        });
    }, [page]);
    const onPrevious = React.useCallback<HotkeyCallback>(() => {
        startTransition(() => {
            if (page > 0 && page < images.length) {
                setPage(page - 1);
            }
        });
    }, [page]);
    return {
        page,
        onNext: (rtlMode.query.data == true ? onPrevious : onNext),
        onPrevious: (rtlMode.query.data == true ? onNext : onPrevious)
    };
}

