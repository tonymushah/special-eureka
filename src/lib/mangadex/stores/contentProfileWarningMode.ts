import { gql_mutation, gql_subscription } from "@mangadex/gql-docs/contentProfileWarningMode";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { get, readable, type Writable } from "svelte/store";
import { mangadexQueryClient } from "..";
import { ContentProfileWarningMode } from "@mangadex/gql/graphql";

const sub_read = readable(ContentProfileWarningMode.Always, (set) => {
	const sub = client.subscription(gql_subscription, {}).subscribe((res) => {
		const blur = res.data?.watchContentProfileWarningMode;
		if (blur) {
			set(blur);
		}
	})
	return () => { sub.unsubscribe() }
});

export const contentProfileWarningModeMutation = createMutation({
	mutationKey: ["content-profile", "warning-mode", "update"],
	async mutationFn(mode: ContentProfileWarningMode) {
		const res = await client.mutation(gql_mutation, {
			mode
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	},
	networkMode: "always"
}, mangadexQueryClient);

const contentProfileWarningMode: Writable<ContentProfileWarningMode> = {
	subscribe(run, invalidate) {
		return sub_read.subscribe(run, invalidate);
	},
	set(value) {
		get(contentProfileWarningModeMutation).mutate(value);
	},
	update(updater) {
		const value = get(sub_read);
		get(contentProfileWarningModeMutation).mutate(updater(value));
	},
}

export default contentProfileWarningMode;
