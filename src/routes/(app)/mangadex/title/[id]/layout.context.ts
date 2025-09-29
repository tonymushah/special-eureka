import {
	CoverImageQuality
} from "@mangadex/gql/graphql";
import getTitleConflicts from "@mangadex/utils/conflicts";
import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
import get_value_and_random_if_undefined from "@mangadex/utils/lang/get_value_and_random_if_undefined";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import manga_altTitle_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-altTitle-to-lang-map";
import type { Tag } from "@mangadex/utils/types/Tag";
import { error } from "@sveltejs/kit";
import type { Client } from "@urql/svelte";
import { queryStore } from "@urql/svelte";
import { getContext, setContext } from "svelte";
import query from "./(layout)/query";
import statsQuery from "./(layout)/statsQuery";

const contextKey = "title-layout-data";

export async function load(id: string, client: Client) {
	const queryRes = await client.query(
		query,
		{
			id
		},
	).toPromise();
	if (queryRes.error) {
		throw queryRes.error;
	} else if (queryRes.data != undefined) {
		const data = queryRes.data.manga.get;

		const tags = data.attributes.tags.map<Tag>((t) => ({
			id: t.id,
			name: t.attributes.name.en
		}));
		const conflicts = await getTitleConflicts({ client, title: data, id });

		return {
			queryResult: data,
			layoutData: {
				id: data.id,
				title: get_value_from_title_and_random_if_undefined(
					data.attributes.title,
					"en"
				),
				altTitle: get_value_and_random_if_undefined(
					manga_altTitle_to_lang_map(data.attributes.altTitles),
					"en"
				),
				tags,
				state: data.attributes.state,
				status: data.attributes.status,
				authors: data.relationships.authorArtists.map((a) => ({
					id: a.id,
					name: a.attributes.name
				})),
				year: data.attributes.year,
				coverImage: get_cover_art({
					cover_id: data.relationships.coverArt.id,
					manga_id: id,
					filename: data.relationships.coverArt.attributes.fileName,
					client,
					mode: CoverImageQuality.V512
				}),
				coverImageAlt: `${data.relationships.coverArt.id}/${data.relationships.coverArt.attributes.fileName}`,
				description: get_value_from_title_and_random_if_undefined(
					data.attributes.description,
					"en"
				),
				contentRating: data.attributes.contentRating
			},
			statsQueryStore: queryStore({
				client,
				query: statsQuery,
				variables: {
					id
				}
			}),
			conflicts
		};
	} else {
		throw new Error("Title not found");
	}
}

export type LayoutData = Awaited<ReturnType<typeof load>>;

export function getTitleLayoutData(): LayoutData {
	return getContext(contextKey);
}
export function setTitleLayoutData(data: LayoutData) {
	setContext(contextKey, data);
}
