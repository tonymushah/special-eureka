import type { LayoutLoad } from "./$types";
import query from "./(layout)/query";
import statsQuery from "./(layout)/statsQuery";
import { error } from "@sveltejs/kit";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import manga_altTitle_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-altTitle-to-lang-map";
import get_value_and_random_if_undefined from "@mangadex/utils/lang/get_value_and_random_if_undefined";
import type { Tag } from "@mangadex/utils/types/Tag";
import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
import { CoverImageQuality } from "@mangadex/gql/graphql";
import { queryStore } from "@urql/svelte";

export const load: LayoutLoad = async function ({ params }) {
    const { client } = await import("@mangadex/gql/urql");
    const { id } = params;
    if (id != null) {
        const queryRes = await client.query(query, {
            id
        }, {
            optimistic: true
        });
        if (queryRes.error) {
            error(500, {
                message: queryRes.error.message
            });
        } else if (queryRes.data != undefined) {
            const data = queryRes.data.manga.get;
            return {
                queryResult: data,
                layoutData: {
                    id: data.id,
                    title: get_value_from_title_and_random_if_undefined(data.attributes.title, "en"),
                    altTitle: get_value_and_random_if_undefined(manga_altTitle_to_lang_map(data.attributes.altTitles), "en"),
                    tags: data.attributes.tags.map<Tag>((t) => ({
                        id: t.id,
                        name: t.attributes.name.en,
                    })),
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
                    description: get_value_from_title_and_random_if_undefined(data.attributes.description, "en")
                },
                statsQueryStore: queryStore({
                    client,
                    query: statsQuery,
                    variables: {
                        id
                    }
                })
            }
        } else {
            error(404, {
                message: "Title not found"
            });
        }
    }
}