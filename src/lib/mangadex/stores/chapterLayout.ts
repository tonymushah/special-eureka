import { graphql } from "@mangadex/gql";
import { DrawerMode, ProgressMode, SidebarMode } from "@mangadex/gql/graphql";
import { client as qlClient } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { derived, get, type Writable } from "svelte/store";

const subscription = graphql(`
	subscription chapterLayoutSubscription {
		watchChapterLayout {
			drawer
			sidebar
			progress
		}
	}
`);

const mutation = graphql(`
	mutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode, $progress: ProgressMode) {
		userOption {
			setChapterLayout(sidebar: $sidebar, drawer: $drawer, progress: $progress) {
				sidebar
				drawer
				progress
			}
		}
	}
`);

export async function setChapterSidebarLayout(sidebar: SidebarMode, client = qlClient) {
	return await client
		.mutation(mutation, {
			sidebar
		})
		.toPromise();
}

export async function setChapterDrawerLayout(drawer: DrawerMode, client = qlClient) {
	return await client
		.mutation(mutation, {
			drawer
		})
		.toPromise();
}

export async function setChapterProgressLayout(progress: ProgressMode, client = qlClient) {
	return await client
		.mutation(mutation, {
			progress
		})
		.toPromise();
}

const subStore = derived(
	subscriptionStore({
		query: subscription,
		client: qlClient
	}),
	(res) => res.data?.watchChapterLayout
);

const readSidebarModeStore = derived(subStore, (d) => d?.sidebar ?? SidebarMode.Default);

const readDrawerMode = derived(subStore, (d) => d?.drawer ?? DrawerMode.Unpinned);

const readProgressMode = derived(subStore, (d) => d?.progress ?? ProgressMode.Default);

export const sidebarModeStore: Writable<SidebarMode> = {
	subscribe(run, invalidate) {
		return readSidebarModeStore.subscribe(run, invalidate);
	},
	set(value) {
		setChapterSidebarLayout(value).catch(console.error);
	},
	update(updater) {
		setChapterSidebarLayout(updater(get(readSidebarModeStore))).catch(console.error);
	}
};

export const drawerModeStore: Writable<DrawerMode> = {
	subscribe(run, invalidate) {
		return readDrawerMode.subscribe(run, invalidate);
	},
	set(value) {
		setChapterDrawerLayout(value).catch(console.error);
	},
	update(updater) {
		setChapterDrawerLayout(updater(get(readDrawerMode))).catch(console.error);
	}
};

export const progressModeStore: Writable<ProgressMode> = {
	subscribe(run, invalidate) {
		return readProgressMode.subscribe(run, invalidate);
	},
	set(value) {
		setChapterProgressLayout(value).catch(console.error);
	},
	update(updater) {
		setChapterProgressLayout(updater(get(readProgressMode))).catch(console.error);
	},
}