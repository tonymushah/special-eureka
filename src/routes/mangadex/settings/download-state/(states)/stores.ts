import { client } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { chapterTasksSubQuery, coverTasksSubQuery, mangaTasksSubQuery } from "./query";
import { derived, type Readable } from "svelte/store";

export const mangaTasksSub = subscriptionStore({
	client,
	query: mangaTasksSubQuery
});

export const coverTasksSub = subscriptionStore({
	client,
	query: coverTasksSubQuery
});

export const chapterTasksSub = subscriptionStore({
	client,
	query: chapterTasksSubQuery
})

export const mangaTasks: Readable<string[]> = derived(mangaTasksSub, (sub) => sub.data?.watchMangaTasksList ?? []);

export const coverTasks: Readable<string[]> = derived(coverTasksSub, (sub) => sub.data?.watchCoverTasksList ?? []);

export const chapterTasks: Readable<string[]> = derived(chapterTasksSub, (sub) => sub.data?.watchChaptersTasksList ?? []);