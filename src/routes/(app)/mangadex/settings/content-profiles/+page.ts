import { allTagsQuery } from "@mangadex/gql-docs/allTags";
import getClient from "@mangadex/gql/urql/getClient";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import { transformToStringRecord } from "@mangadex/utils/transformToStringRecord";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const client = await getClient();
	const res = await client.query(allTagsQuery, {}).toPromise();
	if (res.error) {
		throw res.error;
	}
	return {
		tags: res.data?.tag.list.data.map((t) => ({
			id: t.id,
			name:
				get_value_from_title_and_random_if_undefined(
					transformToStringRecord(t.attributes.name),
					"en"
				) ?? "",
			group: t.attributes.group
		}))
	};
};