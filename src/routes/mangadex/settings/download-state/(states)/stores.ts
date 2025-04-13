import type {
	ListenToChapterTasksIDsSubscription,
	ListenToChapterTasksIDsSubscriptionVariables,
	ListenToCoverTasksIDsSubscription,
	ListenToCoverTasksIDsSubscriptionVariables,
	ListenToMangaTasksIDsSubscription,
	ListenToMangaTasksIDsSubscriptionVariables
} from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { type OperationResult } from "@urql/svelte";
import { derived, readable, type Readable, type StartStopNotifier } from "svelte/store";
import { chapterTasksSubQuery, coverTasksSubQuery, mangaTasksSubQuery } from "./query";
import { debounce, delay } from "lodash";

const mangaTasksSubStart = debounce<StartStopNotifier<OperationResult<ListenToMangaTasksIDsSubscription, ListenToMangaTasksIDsSubscriptionVariables>
	| undefined>>((set) => {
		const sub = client.subscription(mangaTasksSubQuery, {}, {
			optimistic: false
		}).subscribe(set);
		return () => {
			sub.unsubscribe();
		};
	})

export const mangaTasksSub = readable<
	| OperationResult<ListenToMangaTasksIDsSubscription, ListenToMangaTasksIDsSubscriptionVariables>
	| undefined
>(undefined, mangaTasksSubStart);

const coverTasksSubStart = debounce<StartStopNotifier<OperationResult<ListenToCoverTasksIDsSubscription, ListenToCoverTasksIDsSubscriptionVariables> | undefined>>((set) => {
	const sub = client.subscription(coverTasksSubQuery, {}, {
		optimistic: false
	}).subscribe(set);
	return () => {
		sub.unsubscribe();
	};
});
export const coverTasksSub = readable<
	| OperationResult<ListenToCoverTasksIDsSubscription, ListenToCoverTasksIDsSubscriptionVariables>
	| undefined
>(undefined, coverTasksSubStart);

const chapterTasksSubStart = debounce<StartStopNotifier<OperationResult<
	ListenToChapterTasksIDsSubscription,
	ListenToChapterTasksIDsSubscriptionVariables
> | undefined>>((_set) => {
	const set = (d: OperationResult<
		ListenToChapterTasksIDsSubscription,
		ListenToChapterTasksIDsSubscriptionVariables
	> | undefined) => { delay(_set, 400, d) }
	const sub = client.subscription(chapterTasksSubQuery, {}, {
		optimistic: false
	}).subscribe(set);
	return () => {
		sub.unsubscribe();
	};
})

export const chapterTasksSub = readable<
	| OperationResult<
		ListenToChapterTasksIDsSubscription,
		ListenToChapterTasksIDsSubscriptionVariables
	>
	| undefined
>(undefined, chapterTasksSubStart);

export const mangaTasks: Readable<string[]> = derived(mangaTasksSub, (sub) => {
	const tasks = sub?.data?.watchMangaTasksList ?? [];
	return Array.from(new Set(tasks));
});

export const coverTasks: Readable<string[]> = derived(coverTasksSub, (sub) => {
	const tasks = sub?.data?.watchCoverTasksList ?? [];
	return Array.from(new Set(tasks));
});

export const chapterTasks: Readable<string[]> = derived(chapterTasksSub, (sub) => {
	const tasks = sub?.data?.watchChaptersTasksList ?? [];
	return Array.from(new Set(tasks));
});
