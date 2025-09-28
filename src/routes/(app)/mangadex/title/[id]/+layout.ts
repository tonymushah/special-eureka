import { query as defaultProfileQuery } from "@mangadex/content-profile/graphql/defaultProfile/query";
import { allTagsQuery } from "@mangadex/gql-docs/allTags";
import isInLibrary, { isInLibraryUnlessDropped } from "@mangadex/gql-docs/library/isIn";
import {
	ContentProfileWarningMode,
	ContentRating,
	CoverImageQuality
} from "@mangadex/gql/graphql";
import getClient from "@mangadex/gql/urql/getClient";
import getContentProfileWarningMode from "@mangadex/utils/contentProfileWarningMode";
import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
import get_value_and_random_if_undefined from "@mangadex/utils/lang/get_value_and_random_if_undefined";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import manga_altTitle_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-altTitle-to-lang-map";
import type { Tag } from "@mangadex/utils/types/Tag";
import { error } from "@sveltejs/kit";
import { queryStore } from "@urql/svelte";
import type { LayoutLoad } from "./$types";
import query from "./(layout)/query";
import statsQuery from "./(layout)/statsQuery";
import getTitleConflicts from "@mangadex/utils/conflicts";

export const load: LayoutLoad = async function ({ params }) {
	const client = await getClient();

	const tags = await client.query(allTagsQuery, {}).toPromise().then((res) => {
		if (res.data) {
			return new Map(
				res.data.tag.list.data.map((tag) => [
					tag.id as string,
					get_value_from_title_and_random_if_undefined(tag.attributes.name, "en") ?? ""
				])
			);
		} else if (res.error) {
			error(500, {
				message: res.error.message
			});
		} else {
			error(500, {
				message: "Query not executed"
			});
		}
	});
	const { id } = params;
	if (id != null) {
		const queryRes = await client.query(
			query,
			{
				id
			},
		).toPromise();
		if (queryRes.error) {
			error(500, {
				message: queryRes.error.message
			});
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
			error(404, {
				message: "Title not found"
			});
		}
	} else {
		error(404, {
			message: "Title not found"
		});
	}
};
