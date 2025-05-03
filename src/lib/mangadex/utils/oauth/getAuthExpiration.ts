import { graphql } from "@mangadex/gql";
import type { Client } from "@urql/svelte";

const query = graphql(`
	query getAuthExpiration {
		userOption {
			getAuthDateTimeLimit
		}
	}
`);

export default async function getAuthExpiration(client: Client): Promise<Date | undefined> {
	const res = await client.query(query, {}).toPromise();
	if (res.error) {
		throw res.error
	} else if (res.data) {
		const maybeDate = res.data.userOption.getAuthDateTimeLimit;
		if (maybeDate != null && maybeDate != undefined) {
			return new Date(maybeDate)
		} else {
			return undefined;
		}
	} else {
		return undefined;
	}
}