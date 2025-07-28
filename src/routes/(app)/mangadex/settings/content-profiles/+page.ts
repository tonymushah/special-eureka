import type { PageLoad } from "./$types";
import getClient from "@mangadex/gql/urql/getClient";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import { allTagsQuery } from "@mangadex/gql-docs/allTags";

export const load: PageLoad = async () => {
	const client = await getClient();
	const res = await client.query(allTagsQuery, {}).toPromise();
	if (res.error) {
		throw res.error;
	}
	return {
		tags: res.data?.tag.list.data.map((t) => ({
			id: t.id,
			name: get_value_from_title_and_random_if_undefined(t.attributes.name, "en") ?? "",
			group: t.attributes.group
		}))
	};
};
