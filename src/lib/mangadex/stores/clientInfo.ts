import { graphql } from "@mangadex/gql/exports";
import type { ClientInfo } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import type { Client } from "@urql/svelte";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

export const subscription = graphql(`
	subscription currentClientInfo {
		watchClientInfo {
			clientSecret
			clientId
		}
	}
`);

export const setMutation = graphql(`
	mutation setAuthClient($clientId: String!, $clientSecret: String!) {
		oauth {
			setClientInfo(clientId: $clientId, clientSecret: $clientSecret)
		}
	}
`);

export const clearMutation = graphql(`
	mutation resetAuthClient {
		oauth {
			clearClientInfo
		}
	}
`);

const clientInfoReadable = readable<ClientInfo | undefined>(undefined, (set) => {
	const sub = client.subscription(subscription, {}).subscribe((info) => {
		if (info.data?.watchClientInfo) {
			set(info.data.watchClientInfo);
		} else {
			set(undefined);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

export async function setClientInfo(client: Client, info: ClientInfo | undefined) {
	if (info) {
		await client.mutation(setMutation, info).toPromise();
	} else {
		await client.mutation(clearMutation, {}).toPromise();
	}
}

const clientInfo: Writable<ClientInfo | undefined> = {
	subscribe: clientInfoReadable.subscribe,
	set(value) {
		setClientInfo(client, value);
	},
	update(updater) {
		setClientInfo(client, updater(get(clientInfoReadable)));
	}
};

export default clientInfo;
