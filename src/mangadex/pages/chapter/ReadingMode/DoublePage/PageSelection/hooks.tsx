import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import { useDoublePageReadingStateMutation } from "../ActualDoublePage/hooks";
import useDoublePageChapter_ReadingStateData from "../ActualDoublePage/useDoublePageChapter_ReadingStateData";
import { useStoryBookRTLSwipperMode } from "@mangadex/resources/storybook/hooks/user-option/RTLMode";
import { _getLastInURL_ } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import { Skeleton } from "@chakra-ui/react";
import OutDoublePageInput from "../ReadingState/OutDoublePageInput";

export default function useState(chapter: Chapter) {
    const [isTranstion_, startTransition] = React.useTransition();
    const { state, images } = useDoublePageChapter_ReadingStateData(chapter);

    const page = React.useMemo(() => {
        return state.data?.current;
    }, [state.data]);

    const limit = React.useMemo(() => {
        return images.data?.length;
    }, [images.data]);

    const { mutate, isLoading } = useDoublePageReadingStateMutation(chapter);
    const isTranstion = React.useMemo(() => {
        return isTranstion_ || isLoading;
    }, [isLoading, isTranstion_]);
    const setPage = React.useCallback((input: number) => {
        startTransition(() => {
            mutate(input);
        });
    }, [mutate, page]);

    const rtl_mode = useStoryBookRTLSwipperMode({
        initialData: false
    });

    const onNext = React.useCallback(() => {
        startTransition(() => {
            if (page != undefined && limit != undefined) {
                if (page >= 0 && page < (limit - 1)) {
                    setPage(page + 1);
                }
            }
        });
    }, [page, limit]);

    const onPrevious = React.useCallback(() => {
        startTransition(() => {
            if (page != undefined && limit != undefined) {
                if (page > 0 && page < limit) {
                    setPage(page - 1);
                }
            }
        });
    }, [page, limit]);

    const current = React.useMemo(() => {
        const current_index = images.data?.at(page ?? 0);
        if (current_index != undefined) {
            return (
                <OutDoublePageInput value={current_index} />
            );
        } else {
            return (
                <Skeleton />
            );
        }
    }, [page, limit]);

    const isPreviousDisabled = React.useMemo(() => {
        if (page != undefined && limit != undefined) {
            return (page <= 0);
        } else {
            return undefined;
        }
    }, [page, limit]);

    const isNextDisabled = React.useMemo(() => {
        if (page != undefined && limit != undefined) {
            return (page >= limit - 1);
        } else {
            return undefined;
        }
    }, [page, limit]);

    const limit_comp = React.useMemo(() => {
        const value = images.data?.at(((limit ?? 1) - 1) ?? 0);
        if (value != undefined) {
            if (typeof value == "string") {
                return (
                    <React.Fragment>
                        {parseInt(_getLastInURL_(value)?.match(/\d+/)?.[0] ?? "0")}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        {parseInt(_getLastInURL_(value[1])?.match(/\d+/)?.[0] ?? "0")}
                    </React.Fragment>
                );
            }
        } else {
            return (
                <Skeleton />
            );
        }

    }, [limit, images.data]);
    return {
        isTranstion,
        isNextDisabled,
        isPreviousDisabled,
        current,
        onPrevious,
        onNext,
        rtl_mode,
        startTransition,
        images,
        state,
        setPage,
        limit,
        limit_comp
    };
}