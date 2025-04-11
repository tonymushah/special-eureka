import type { ListenToChapterTasksIDsSubscription, ListenToChapterTasksIDsSubscriptionVariables, ListenToCoverTasksIDsSubscription, ListenToCoverTasksIDsSubscriptionVariables, ListenToMangaTasksIDsSubscription, ListenToMangaTasksIDsSubscriptionVariables } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { type OperationResult } from "@urql/svelte";
import { derived, readable, type Readable } from "svelte/store";
import { chapterTasksSubQuery, coverTasksSubQuery, mangaTasksSubQuery } from "./query";

export const mangaTasksSub = readable<OperationResult<ListenToMangaTasksIDsSubscription, ListenToMangaTasksIDsSubscriptionVariables> | undefined>(undefined, (set) => {
	const sub = client.subscription(mangaTasksSubQuery, {}).subscribe(set);
	return () => {
		sub.unsubscribe();
	}
});

export const coverTasksSub = readable<OperationResult<ListenToCoverTasksIDsSubscription, ListenToCoverTasksIDsSubscriptionVariables> | undefined>(undefined, (set) => {
	const sub = client.subscription(coverTasksSubQuery, {}).subscribe(set);
	return () => {
		sub.unsubscribe();
	};
})
export const chapterTasksSub = readable<OperationResult<ListenToChapterTasksIDsSubscription, ListenToChapterTasksIDsSubscriptionVariables> | undefined>(undefined, (set) => {
	const sub = client.subscription(chapterTasksSubQuery, {}).subscribe(set);
	return () => {
		sub.unsubscribe();
	}
});

export const mangaTasks: Readable<string[]> = derived(mangaTasksSub, (sub) => sub?.data?.watchMangaTasksList ?? []);

export const coverTasks: Readable<string[]> = derived(coverTasksSub, (sub) => sub?.data?.watchCoverTasksList ?? []);

export const chapterTasks: Readable<string[]> = derived(chapterTasksSub, (sub) => sub?.data?.watchChaptersTasksList ?? []);