import { graphql } from "@mangadex/gql/exports";
import { PaginationStyle } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import type { Client } from "@urql/svelte";
import { get, readable, type Writable } from "svelte/store";

const sub = graphql(`
	subscription paginationStyleUpdate {
		watchPaginationStyle
	}
`);

const mutation = graphql(`
	mutation updatePaginationStyle($style: PaginationStyle!) {
		userOption {
			setPaginationStyle(style: $style)
		}
	}
`);

export async function updatePaginationStyle(client: Client, style: PaginationStyle) {
	await client
		.mutation(mutation, {
			style
		})
		.toPromise();
}

const readStore = readable(PaginationStyle.InfiniteScroll, (set) => {
	const sub_ = client.subscription(sub, {}).subscribe((res) => {
		if (res.data?.watchPaginationStyle) {
			set(res.data.watchPaginationStyle);
		}
	});
	return () => {
		sub_.unsubscribe();
	};
});

const paginationStyle: Writable<PaginationStyle> = {
	subscribe: readStore.subscribe,
	set(value) {
		updatePaginationStyle(client, value);
	},
	update(updater) {
		updatePaginationStyle(client, updater(get(readStore)));
	}
};

export default paginationStyle;
