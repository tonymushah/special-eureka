import { graphql } from "@mangadex/gql";
import { DownloadMode } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { derived, get, type Writable } from "svelte/store";

export const subscription = graphql(`
	subscription chapterQualitySubscription {
		watchChapterQuality
	}
`);

export const mutation = graphql(`
	mutation chapterQualityMutation($quality: DownloadMode) {
		userOption {
			setChapterQuality(quality: $quality)
		}
	}
`);

const subscription_store = subscriptionStore({
	client,
	query: subscription
});

const sub_quality_store = derived(
	subscription_store,
	(sub) => sub.data?.watchChapterQuality ?? DownloadMode.Normal
);

export const chapterQuality: Writable<DownloadMode> = {
	subscribe: sub_quality_store.subscribe,
	set(value) {
		client
			.mutation(mutation, {
				quality: value
			})
			.toPromise()
			.catch(console.error);
	},
	update(updater) {
		const value = get(sub_quality_store);
		client
			.mutation(mutation, {
				quality: updater(value)
			})
			.toPromise()
			.catch(console.error);
	}
};

const is_data_saver_read = derived(sub_quality_store, (sub) => sub == DownloadMode.DataSaver);

export const isDataSaver: Writable<boolean> = {
	subscribe: is_data_saver_read.subscribe,
	set(value) {
		client
			.mutation(mutation, {
				quality: value ? DownloadMode.DataSaver : DownloadMode.Normal
			})
			.toPromise()
			.catch(console.error);
	},
	update(updater) {
		const value = get(is_data_saver_read);
		client
			.mutation(mutation, {
				quality: updater(value) ? DownloadMode.DataSaver : DownloadMode.Normal
			})
			.toPromise()
			.catch(console.error);
	}
};
