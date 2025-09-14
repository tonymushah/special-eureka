import { gql_mutation, gql_subscription } from "@mangadex/gql-docs/forcePort443";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { get, readable, type Writable } from "svelte/store";
import { mangadexQueryClient } from "..";

const sub_read = readable(false, (set) => {
	const sub = client.subscription(gql_subscription, {}).subscribe((res) => {
		const blur = res.data?.watchForcePort443;
		if (blur) {
			set(blur);
		}
	})
	return () => { sub.unsubscribe() }
});

export const forcePort443Mutation = createMutation({
	mutationKey: ["force-port-443", "update"],
	async mutationFn(force: boolean) {
		const res = await client.mutation(gql_mutation, {
			force
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	},
	networkMode: "always"
}, mangadexQueryClient);

const forcePort443: Writable<boolean> = {
	subscribe(run, invalidate) {
		return sub_read.subscribe(run, invalidate);
	},
	set(value) {
		get(forcePort443Mutation).mutate(value);
	},
	update(updater) {
		const value = get(sub_read);
		get(forcePort443Mutation).mutate(updater(value));
	},
}

export default forcePort443;
