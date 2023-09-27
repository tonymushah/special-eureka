import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { useMangaDexPath } from "@mangadex/index";
import { get_aggregate_query } from "@mangadex/resources/hooks/AgreggateStateHooks";
import React from "react";
import { useNavigate } from "react-router";

export function useChapterNavigation(chapter : Chapter){
    const mangadexPath = useMangaDexPath();
    const navigate = useNavigate();
    const client = useHTTPClient();
    const aggregate = get_aggregate_query({
        aggregate_options: chapter.getAggregateList_options(client),
        queryOption: {
            staleTime: 1000 * 60 * 30
        }
    }).query;
    const navigateToNext = React.useCallback(async () => {
        if (aggregate.isSuccess) {
            try {
                const next = await aggregate.data.getNext(chapter.get_id());
                navigate(`${mangadexPath}/chapter/${next}`);
            } catch (error) {
                const mangaId = chapter.get_manga_id();
                navigate(`${mangadexPath}/manga/${mangaId}`);
            }
        }
    }, [navigate, aggregate, mangadexPath]);
    const navigateToPrevious = React.useCallback(async () => {
        if (aggregate.isSuccess) {
            try {
                const previous = await aggregate.data.getPrevious(chapter.get_id());
                navigate(`${mangadexPath}/chapter/${previous}`);
            } catch (error) {
                const mangaId = chapter.get_manga_id();
                navigate(`${mangadexPath}/manga/${mangaId}`);
            }
        }
    }, [navigate, aggregate, mangadexPath]);
    return {
        navigateToNext,
        navigateToPrevious
    };
}