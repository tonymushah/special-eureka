import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useMangaDexPath } from "@mangadex/index";
import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import { get_aggregate_query } from "@mangadex/resources/hooks/AgreggateStateHooks";
//import { useStoryBookRTLSwipperMode } from "@mangadex/resources/storybook/hooks/user-option/RTLMode";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React, { startTransition } from "react";
import { HotkeyCallback } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

export function useSinglePageReadingHooks({ data, startPage }: {
    data: ChapterPage_outlet_context
    startPage?: number
}) {
    const { query, setCurrentPage } = useChapterPages({
        chapter: data.chapter
    }); 
    const client = useHTTPClient();
    const aggregate = get_aggregate_query({
        aggregate_options: data.chapter.getAggregateList_options(client),
        queryOption: {
            staleTime: 1000 * 60 * 30
        }
    }).query;
    const mangadexPath = useMangaDexPath();
    const navigate = useNavigate();
    const page = React.useMemo(() => {
        return query.data.current;
    }, [query.data.current]);
    /*
        React.useEffect(() => {
            console.log(page);
        }, [page]);
    */
    const setPage = React.useCallback((input: number) => {
        setCurrentPage(input);
    }, [page]);
    // const rtl = useRTLSwipperMode();
    const rtl = useRTLSwipperMode();
    const navigateToNext = React.useCallback(async () => {
        if(aggregate.isSuccess){
            navigate(`${mangadexPath}/chapter/${await aggregate.data.getNext(data.chapter.get_id())}`);
        }
    }, []);
    const navigateToPrevious = React.useCallback(async () => {
        if(aggregate.isSuccess){
            navigate(`${mangadexPath}/chapter/${await aggregate.data.getPrevious(data.chapter.get_id())}`);
        }
    }, []);
    const onNext = React.useCallback<HotkeyCallback>(() => {
        if (page >= 0 && page < (data.images.length - 1)) {
            setPage(page + 1);
        }else if(page >= data.images.length - 1){
            startTransition(() => {
                navigateToNext();
            });
        }
    }, [page]);
    const onPrevious = React.useCallback<HotkeyCallback>(() => {
        if (page > 0 && page < data.images.length) {
            setPage(page - 1);
        }else if(page <= 0){
            startTransition(() => {
                navigateToPrevious();
            });
        }
    }, [page]);
    React.useEffect(() => {
        if (startPage != undefined) {
            setCurrentPage(startPage);
        }
    }, [startPage]);
    return React.useMemo(() => {
        return ({
            page,
            setPage,
            onNext: rtl.query.data == true ? onPrevious : onNext,
            onPrevious: rtl.query.data == true ? onNext : onPrevious
        });
    }, [page, rtl.query.data]);
}