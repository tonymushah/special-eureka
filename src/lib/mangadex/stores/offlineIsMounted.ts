import { graphql } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { derived } from "svelte/store";

export const serverIconStateQuery = graphql(/* GraphQL */ `
	subscription serverIconState {
		watchIsAppMounted
	}
`);

export const offline_server_state_sub = subscriptionStore({
	client,
	query: serverIconStateQuery,
	variables: {}
});

export const isMounted = derived(
	offline_server_state_sub,
	(sub) => sub.data?.watchIsAppMounted ?? false
);
