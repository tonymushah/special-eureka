import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { derived, get, type Writable } from "svelte/store";

const subscription = graphql(`
	subscription pageLimitSubscription {
		watchPageLimit
	}
`);

const mutation = graphql(`
	mutation setPageLimit($limit: Int) {
		userOption {
			setPageLimit(value: $limit)
		}
	}
`);

const page_limit_sub = derived(
	subscriptionStore({
		client,
		query: subscription
	}),
	(sub) => sub.data?.watchPageLimit ?? 10
);

const pageLimit: Writable<number> = {
	subscribe(run, invalidate) {
		return page_limit_sub.subscribe(run, invalidate);
	},
	set(value) {
		client
			.mutation(mutation, {
				limit: value
			})
			.toPromise()
			.catch(console.error);
	},
	update(updater) {
		client
			.mutation(mutation, {
				limit: updater(get(page_limit_sub))
			})
			.toPromise()
			.catch(console.error);
	}
};

export default pageLimit;
