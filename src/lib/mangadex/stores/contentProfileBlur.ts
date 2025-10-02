import { gql_mutation, gql_subscription } from "@mangadex/gql-docs/contentProfileBlur";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { get, readable, type Writable } from "svelte/store";
import { mangadexQueryClient } from "..";

const sub_read = readable(true, (set) => {
	const sub = client.subscription(gql_subscription, {}).subscribe((res) => {
		const blur = res.data?.watchContentProfileBlur;
		if (blur) {
			set(blur);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

export const contentProfileBlurMutation = createMutation(
	{
		mutationKey: ["content-profile", "blur", "update"],
		async mutationFn(blur: boolean) {
			const res = await client
				.mutation(gql_mutation, {
					blur
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			}
		},
		networkMode: "always"
	},
	mangadexQueryClient
);

const contentProfileBlur: Writable<boolean> = {
	subscribe(run, invalidate) {
		return sub_read.subscribe(run, invalidate);
	},
	set(value) {
		get(contentProfileBlurMutation).mutate(value);
	},
	update(updater) {
		const value = get(sub_read);
		get(contentProfileBlurMutation).mutate(updater(value));
	}
};

export default contentProfileBlur;
