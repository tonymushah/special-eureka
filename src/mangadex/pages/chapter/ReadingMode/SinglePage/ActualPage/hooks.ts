import { ChapterPage_outlet_context } from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/UseChapterOutletContext";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import { useStoryBookRTLSwipperMode } from "@mangadex/resources/storybook/hooks/user-option/RTLMode";
/*import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";*/
import React from "react";
import { HotkeyCallback } from "react-hotkeys-hook";

export function useSinglePageReadingHooks({ data }: {
    data: ChapterPage_outlet_context
}) {
    const { query, setCurrentPage } = useChapterPages({
        chapter: data.chapter
    });

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
    const rtl = useStoryBookRTLSwipperMode();
    const onNext = React.useCallback<HotkeyCallback>(() => {
        if (page >= 0 && page < (data.images.length - 1)) {
            setPage(page + 1);
        }
    }, [page]);
    const onPrevious = React.useCallback<HotkeyCallback>(() => {
        if (page > 0 && page < data.images.length) {
            setPage(page - 1);
        }
    }, [page]);

    return React.useMemo(() => {
        return ({
            page,
            setPage,
            onNext : rtl.query.data == true ? onPrevious : onNext,
            onPrevious : rtl.query.data == true ? onNext : onPrevious
        });
    }, [page, rtl.query.data]);
}