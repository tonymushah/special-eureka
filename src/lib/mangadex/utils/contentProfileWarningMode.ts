import { gql_query } from "@mangadex/gql-docs/contentProfileWarningMode";
import type { ContentProfileWarningMode } from "@mangadex/gql/graphql";
import type { Client } from "@urql/svelte";

export default async function getContentProfileWarningMode(client: Client): Promise<ContentProfileWarningMode> {
	const res = await client.query(gql_query, {}).toPromise();
	if (res.data) {
		return res.data.userOption.getContentProfileWarningMode
	} else if (res.error) {
		throw res.error
	} else {
		throw new Error("No data??");
	}
}