import { allTagsQuery } from "@mangadex/gql-docs/allTags";
import getClient from "@mangadex/gql/urql/getClient";
import manga_title_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-title-to-lang-map";
import { transformToStringRecord } from "@mangadex/utils/transformToStringRecord";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (param) => {
	const client = await getClient();
	const res = await client
		.query(allTagsQuery, {})
		.toPromise()
		.then((res) => {
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				const tags = new Map(
					res.data.tag.list.data.map((d) => [
						d.id,
						manga_title_to_lang_map(transformToStringRecord(d.attributes.name))
					])
				);
				const names = tags.get(param.params.id);
				if (names == null) {
					error(404, {
						message: `Cannot find tag ${param.params.id}`
					});
				}
				return {
					id: param.params.id,
					names
				};
			} else {
				throw new Error("no data??");
			}
		});
	return res;
};