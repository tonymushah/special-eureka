import { graphql } from "@mangadex/gql/exports";
import type { Client } from "@urql/svelte";

export async function mount(client: Client) {
	return await client
		.mutation(
			graphql(/* GraphQL */ `
				mutation mountAppState {
					offlineAppState {
						mountOfflineAppState
					}
				}
			`),
			{}
		)
		.toPromise();
}
export async function unmount(client: Client) {
	return await client
		.mutation(
			graphql(/* GraphQL */ `
				mutation unmountAppState {
					offlineAppState {
						unmountOfflineAppState
					}
				}
			`),
			{}
		)
		.toPromise();
}
