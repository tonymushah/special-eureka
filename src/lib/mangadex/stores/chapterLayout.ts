import { graphql } from "@mangadex/gql";
import { DrawerMode, SidebarMode } from "@mangadex/gql/graphql";
import { client as qlClient } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { derived, get, type Writable } from "svelte/store";

const subscription = graphql(`
	subscription chapterLayoutSubscription {
		watchChapterLayout {
			drawer
			sidebar
		}
	}
`);

const mutation = graphql(`
	mutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode) {
		userOption {
			setChapterLayout(sidebar: $sidebar, drawer: $drawer) {
				sidebar
				drawer
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

const subStore = derived(
	subscriptionStore({
		query: subscription,
		client: qlClient
	}),
	(res) => res.data?.watchChapterLayout
);

const readSidebarModeStore = derived(subStore, (d) => d?.sidebar ?? SidebarMode.Default);

const readDrawerMode = derived(subStore, (d) => d?.drawer ?? DrawerMode.Unpinned);

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
