import type { CreateInfiniteQueryResult, InfiniteData } from "@tanstack/svelte-query";
import { derived, type Readable } from "svelte/store";
import type AbstractSearchResult from "../searchResult/AbstractSearchResult";
import type { ChapterFeedListItemExt } from "@mangadex/routes/list/[id]/feed/search";

export default function chapterThreadsFromChapterFeedQuery(query: CreateInfiniteQueryResult<InfiniteData<AbstractSearchResult<ChapterFeedListItemExt>>>): Readable<Map<string, string | undefined>> {
	return derived(query, (query) => {
		return new Map(
			query.data?.pages.flatMap((d) =>
				d.data.flatMap((d) =>
					d.chapters.map(
						(c) => [c.chapterId, c.threadUrl] as [string, string | undefined]
					)
				)
			) ?? []
		);
	})
}