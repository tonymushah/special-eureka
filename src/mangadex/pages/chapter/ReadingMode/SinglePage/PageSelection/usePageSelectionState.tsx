import { Chapter } from "@mangadex/api/structures/Chapter";
import useChapterPages from "@mangadex/resources/componnents/chapter/v1/Chapter_Page/useChapterPages";
import useRTLSwipperMode from "@mangadex/resources/hooks/userOptions/RtlSwipperMode";
import React from "react";

export default function usePageSelectionState(chapter: Chapter) {
    const chapter_pages = useChapterPages({
        chapter
    });
    const [isTranstion_, startTransition] = React.useTransition();
    const page = React.useMemo(() => {
        return chapter_pages.query.data.current;
    }, [chapter_pages.query.data.current]);
    const { mutation, setCurrentPage } = chapter_pages;
    const setPage = React.useCallback((input: number) => {
        setCurrentPage(input);
    }, [setCurrentPage]);
    const isTranstion = React.useMemo(() => {
        return isTranstion_ || mutation.isLoading;
    }, [isTranstion_, mutation.isLoading]);
    const rtl_mode = useRTLSwipperMode({
        initialData: false
    });
    const onNext = React.useCallback(() => {
        startTransition(() => {
            if (page >= 0 && page < (chapter.get_pages() - 1)) {
                setPage(page + 1);
            }
        });
    }, [page]);
    const onPrevious = React.useCallback(() => {
        startTransition(() => {
            if (page > 0 && page < chapter.get_pages()) {
                setPage(page - 1);
            }
        });
    }, [page]);
    const isPreviousDisabled = React.useMemo(() => {
        return page <= 0;
    }, [page, chapter_pages.query.data.limit]);
    const isNextDisabled = React.useMemo(() => {
        return page >= (chapter_pages.query.data.limit - 1);
    }, [page, chapter_pages.query.data.limit]);
    return { isTranstion, rtl_mode, isPreviousDisabled, isNextDisabled, onPrevious, onNext, page, setPage };
}
