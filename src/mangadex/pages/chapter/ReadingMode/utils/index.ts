import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { useMangaDexPath } from "@mangadex/index";
import { useChapterFullscreen } from "@mangadex/resources/componnents/chapter/fullscreen/useChapterFullscreen";
import { get_aggregate_query } from "@mangadex/resources/hooks/AgreggateStateHooks";
import React from "react";
import { useNavigate } from "react-router";

export function useChapterNavigation(chapter: Chapter) {

    const mangadexPath = useMangaDexPath();

    const { update_mutation: fullscreen } = useChapterFullscreen();

    const navigate = useNavigate();

    const client = useHTTPClient();

    const aggregate = get_aggregate_query({
        aggregate_options: chapter.getAggregateList_options(client),
        queryOption: {
            staleTime: 1000 * 60 * 30
        }
    }).query;

    const resetFullscreen = React.useCallback(() => {
        fullscreen.mutate(false);
    }, [fullscreen]);

    const navigateToManga = React.useCallback(() => {
        const mangaId = chapter.get_manga_id();
        resetFullscreen();
        navigate(`${mangadexPath}/manga/${mangaId}`);
    }, [navigate, chapter, resetFullscreen, mangadexPath]);

    const navigateToNext = React.useCallback(async () => {
        if (aggregate.isSuccess) {
            try {
                const next = await aggregate.data.getNext(chapter.get_id());
                navigate(`${mangadexPath}/chapter/${next}`);
            } catch (error) {
                navigateToManga();
            }
        }
    }, [navigate, aggregate, mangadexPath, navigateToManga]);

    const navigateToPrevious = React.useCallback(async () => {
        if (aggregate.isSuccess) {
            try {
                const previous = await aggregate.data.getPrevious(chapter.get_id());
                navigate(`${mangadexPath}/chapter/${previous}`);
            } catch (error) {
                navigateToManga();
            }
        }
    }, [navigate, aggregate, mangadexPath, navigateToManga]);

    return {
        navigateToNext,
        navigateToPrevious
    };
}