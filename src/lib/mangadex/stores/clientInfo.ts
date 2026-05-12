import type { ResultOf } from "@graphql-typed-document-node/core";
import { graphql, useFragment } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import type { Client } from "@urql/svelte";
import { get, readable, type Writable } from "svelte/store";

export const ClientInfoFrag = graphql(`
	fragment ClientInfoFrag on ClientInfo {
		clientId
		clientSecret
	}
`);

export type ClientInfo = ResultOf<typeof ClientInfoFrag>;

export const subscription = graphql(`
	subscription currentClientInfo {
		watchClientInfo {
			...ClientInfoFrag
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
			set(useFragment(ClientInfoFrag, info.data.watchClientInfo));
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