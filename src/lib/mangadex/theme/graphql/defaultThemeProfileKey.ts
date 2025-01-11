import { graphql } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

export const subscription = graphql(`
	subscription defaultThemeProfileKeySubscription {
		watchThemeProfileDefaultName
	}
`);

export const mutation = graphql(`
	mutation updateDefaultThemeProfileKey($key: String) {
		userOption {
			setDefaultThemeProfile(name: $key)
		}
	}
`);

const readable_sub = readable<string | undefined>(undefined, (set) => {
	const sub = client.subscription(subscription, {}).subscribe((v) => {
		//console.log("default theme key update");
		const data = v.data?.watchThemeProfileDefaultName;
		set(data == null ? undefined : data);
	});
	return () => {
		sub.unsubscribe();
	};
});

const defaultThemeProfileKey: Writable<string | undefined> = {
	subscribe(run, invalidate) {
		return readable_sub.subscribe(run, invalidate);
	},
	set(value) {
		client
			.mutation(mutation, {
				key: value
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	},
	update(updater) {
		client
			.mutation(mutation, {
				key: updater(get(readable_sub))
			})
			.toPromise()
			.then(console.debug)
			.catch(console.error);
	}
};

export default defaultThemeProfileKey;
