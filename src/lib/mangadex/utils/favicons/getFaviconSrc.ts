import { graphql } from "@mangadex/gql/exports";
import getClient from "@mangadex/gql/urql/getClient";
import { createQuery } from "@tanstack/svelte-query";
import { Client, queryStore } from "@urql/svelte";
import { derived, type Readable } from "svelte/store";

const faviconQuery = graphql(`
	query favicon($url: Url!) {
		utils {
			favicon(url: $url)
		}
	}
`);

export function getFaviconSrcQuery(url: () => string) {
	return createQuery(() => ({
		queryKey: ["get-favicon-src", url()],
		async queryFn() {
			const res = await (
				await getClient()
			)
				.query(faviconQuery, {
					url: url()
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.utils.favicon as string;
			} else {
				throw new Error("no data??");
			}
		},
		staleTime: 1000 * 3600
	}));
}

export function getFaviconSrc({
	url,
	client
}: {
	url: string;
	client: Client;
}): Readable<string | undefined> {
	return derived(
		queryStore({
			query: faviconQuery,
			client,
			variables: {
				url: url
			}
		}),
		($r) => {
			const data = $r.data;
			if (data) {
				return data.utils.favicon;
			}
		}
	);
}
