import { graphql } from "@mangadex/gql/exports";
import type { PageLoad } from "./$types";
import getClient from "@mangadex/gql/urql/getClient";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";

const query = graphql(`
	query allTags {
		tag {
			list {
				data {
					id
					attributes {
						name
						group
					}
				}
			}
		}
	}
`);

export const load: PageLoad = async () => {
	const client = await getClient();
	const res = await client.query(query, {}).toPromise();
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
