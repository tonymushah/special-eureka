import { extractFromAccessor } from "$lib/index.svelte";
import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { get, readable, type Writable } from "svelte/store";
import { mangadexQueryClient } from "..";

export const toastNotifyGQLSetter = graphql(`
	mutation updateToastNotify($notify: Boolean!) {
		userOption {
			setToastNotify(notify: $notify)
		}
	}
`);

export const toastNotifyGQLSub = graphql(`
	subscription listenToToastNotifyStore {
		watchNotifyToast
	}
`);

const toastNotifyMutationLoader = () =>
	createMutation(
		() => ({
			mutationKey: ["inner", "toast", "notify"],
			async mutationFn(notify: boolean) {
				const res = await client
					.mutation(toastNotifyGQLSetter, {
						notify
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

const toastNotifyInner = readable(false, (set) => {
	const sub = client.subscription(toastNotifyGQLSub, {}).subscribe((res) => {
		if (res.data) {
			set(res.data.watchNotifyToast);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

export const toastNotify: Writable<boolean> = {
	subscribe(run, invalidate) {
		return toastNotifyInner.subscribe(run, invalidate);
	},
	set(value) {
		using mut = extractFromAccessor(toastNotifyMutationLoader);
		mut.value.mutate(value);
	},
	update(updater) {
		const value = updater(get(toastNotifyInner));
		using mut = extractFromAccessor(toastNotifyMutationLoader);
		mut.value.mutate(value);
	}
};
