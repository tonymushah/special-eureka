import { graphql } from "@mangadex/gql";
import { DownloadMode } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { subscriptionStore } from "@urql/svelte";
import { derived, get, toStore, type Writable } from "svelte/store";
import { mangadexQueryClient } from "..";
import { extractFromAccessor, root_effect } from "$lib/index.svelte";

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

export const chapterQualityMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["chapter", "quality", "update"],
			async mutationFn(quality: DownloadMode) {
				const res = await client
					.mutation(mutation, {
						quality
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

export const chapterQuality: Writable<DownloadMode> = {
	subscribe: sub_quality_store.subscribe,
	set(value) {
		using mut = extractFromAccessor(chapterQualityMutation);
		mut.value.mutate(value);
	},
	update(updater) {
		const value = updater(get(sub_quality_store));
		using mut = extractFromAccessor(chapterQualityMutation);
		mut.value.mutate(value);
	}
};

const is_data_saver_read = derived(sub_quality_store, (sub) => sub == DownloadMode.DataSaver);

export const isDataSaver: Writable<boolean> = {
	subscribe: is_data_saver_read.subscribe,
	set(value) {
		using mut = extractFromAccessor(chapterQualityMutation);
		mut.value.mutate(value ? DownloadMode.DataSaver : DownloadMode.Normal);
	},
	update(updater) {
		const value = get(is_data_saver_read);
		using mut = extractFromAccessor(chapterQualityMutation);
		mut.value.mutate(updater(value) ? DownloadMode.DataSaver : DownloadMode.Normal);
	}
};
