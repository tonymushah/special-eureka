import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";

export const subscription = graphql(`
	subscription watchDefaultContentProfileKey {
		watchContentProfileDefaultName
	}
`);

export const mutation = graphql(`
	mutation updateDefaultContentProfileKey($name: String) {
		userOption {
			setDefaultContentProfileKey(name: $name)
		}
	}
`);

const sub_read = readable<string | undefined>(undefined, (set) => {
	const sub = client.subscription(subscription, {}).subscribe((res) => {
		const data = res.data;
		if (data?.watchContentProfileDefaultName != null) {
			set(data.watchContentProfileDefaultName);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

const defaultContentProfileKey: Writable<string | undefined> = {
	subscribe: sub_read.subscribe,
	set(value) {
		client
			.mutation(mutation, {
				name: value
			})
			.toPromise()
			.then(console.log)
			.catch(console.error);
	},
	update(updater) {
		client
			.mutation(mutation, {
				name: updater(get(sub_read))
			})
			.toPromise()
			.then(console.log)
			.catch(console.error);
	}
};

export default defaultContentProfileKey;
