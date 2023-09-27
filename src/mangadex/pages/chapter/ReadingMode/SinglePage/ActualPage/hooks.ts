import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";
import { HotkeyCallback } from "react-hotkeys-hook";
import { useChapterNavigation } from "../../utils";

export function useSinglePageReadingHooks({ data, startPage }: {
    data: ChapterPage_outlet_context
    startPage?: number
}) {
    const [, startTransition] = React.useTransition();
    const { query, setCurrentPage } = useChapterPages({
        chapter: data.chapter
    });
    
    const { navigateToNext, navigateToPrevious } = useChapterNavigation(data.chapter);
    
    const page = React.useMemo(() => {
        return query.data.current;
    }, [query.data.current]);
    
    const setPage = React.useCallback((input: number) => {
        setCurrentPage(input);
    }, [page]);

    React.useEffect(() => {
        if (startPage != undefined) {
            setCurrentPage(startPage);
        }
    }, [startPage]);

    const rtl = useRTLSwipperMode();
    
    const onNext = React.useCallback<HotkeyCallback>(() => {
        startTransition(() => {
            if (page >= 0 && page < (data.images.length - 1)) {
                setPage(page + 1);
            } else if (page >= data.images.length - 1) {
                navigateToNext();
            }
        });
    }, [page]);
    
    const onPrevious = React.useCallback<HotkeyCallback>(() => {
        startTransition(() => {
            if (page > 0 && page < data.images.length) {
                setPage(page - 1);
            } else if (page <= 0) {
                navigateToPrevious();
            }
        });
    }, [page]);
    
    
    
    return React.useMemo(() => {
        return ({
            page,
            setPage,
            onNext: rtl.query.data == true ? onPrevious : onNext,
            onPrevious: rtl.query.data == true ? onNext : onPrevious
        });
    }, [page, rtl.query.data, onPrevious, onNext]);
}