import {
	hideReadTitleMutationGQL,
	hideReadTitlesSubscriptionGQL
} from "@mangadex/gql-docs/hide-read-title";
import { client } from "@mangadex/gql/urql";
import { delay } from "lodash";
import { get, readable, type Writable } from "svelte/store";

const hideReadTitlesReadSub = readable(false, (set) => {
	let unsub: (() => void) | undefined = undefined;
	const timer = delay(() => {
		const sub = client.subscription(hideReadTitlesSubscriptionGQL, {}).subscribe((res) => {
			if (res.data) {
				set(res.data.watchHideReadTitles);
			} else if (res.error) {
				console.error(res.error);
			}
		});
		unsub = () => {
			sub.unsubscribe();
		};
	}, 1);
	return () => {
		unsub?.();
		clearTimeout(timer);
	};
});

async function setHideReadTitles(hide: boolean) {
	const res = await client
		.mutation(hideReadTitleMutationGQL, {
			hide
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export const hideReadTitle: Writable<boolean> = {
	subscribe: hideReadTitlesReadSub.subscribe,
	set(value) {
		setHideReadTitles(value).catch(console.error);
	},
	update(updater) {
		const value = updater(get(hideReadTitlesReadSub));
		setHideReadTitles(value).catch(console.error);
	}
};
