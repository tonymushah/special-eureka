import type { ChapterFeedListItemExt } from "@mangadex/routes/list/[id]/feed/search";
import type { CreateInfiniteQueryResult, InfiniteData } from "@tanstack/svelte-query";
import { derived, toStore, type Readable } from "svelte/store";
import type AbstractSearchResult from "../searchResult/AbstractSearchResult";

export default function chapterThreadsFromChapterFeedQuery(query: CreateInfiniteQueryResult<InfiniteData<AbstractSearchResult<ChapterFeedListItemExt>>>): Readable<Map<string, string | undefined>> {
	return derived(toStore(() => query), (query, _set, update) => {
		const pre_map = query.data?.pages.flatMap((d) =>
			d.data.flatMap((d) =>
				d.chapters.map(
					(c) => [c.chapterId, c.threadUrl] as [string, string | undefined]
				)
			)
		) ?? [];
		update((inner) => {
			for (let index = 0; index < pre_map.length; index++) {
				const [id, value] = pre_map[index];
				if (value) {
					inner.set(id, value);
				}
			}
			return inner;
		})
	}, new Map());
}
