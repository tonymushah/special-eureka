import { graphql } from "@mangadex/gql";
import type { CoverImageQuality } from "@mangadex/gql/graphql";
import { Client, queryStore } from "@urql/svelte";
import { derived, type Readable } from "svelte/store";

export default function get_cover_art({
    cover_id,
    manga_id,
    filename,
    client,
    mode
}: {
    cover_id: string;
    manga_id: string;
    filename: string;
    client: Client;
    mode?: CoverImageQuality;
}): Readable<string | undefined> {
    const store = queryStore({
        client,
        query: graphql(`
			query coverImage(
				$cover_id: UUID!
				$manga_id: UUID!
				$filename: String!
				$mode: CoverImageQuality
			) {
				cover {
					getImage(
						coverId: $cover_id
						mangaId: $manga_id
						filename: $filename
						mode: $mode
					)
				}
			}
		`),
        variables: {
            cover_id,
            manga_id,
            filename,
            mode
        }
    });
    return derived(store, ($s, set) => {
        const url: string | undefined = $s.data?.cover.getImage;
        if (url) {
            fetch(url).then(() => {
                set(url)
            }).catch(console.error);
        }
    });
}
