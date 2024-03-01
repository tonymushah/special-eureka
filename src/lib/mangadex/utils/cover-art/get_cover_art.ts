import { graphql } from "@mangadex/gql";
import type { CoverImageQuality } from "@mangadex/gql/graphql";
import { Client, queryStore } from "@urql/svelte";
import { derived } from "svelte/store";

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
    mode: CoverImageQuality;
}) {
    const store = queryStore({
        client,
        query: graphql(`
			query coverImage(
				$cover_id: UUID!
				$manga_id: UUID!
				$filename: String!
				$mode: CoverImageQuality!
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
    return derived(store, ($s) => {
        const buf: Int8Array | undefined = $s.data?.cover.getImage;
        if (buf) {
            const data = btoa(buf.reduce((data, byte) => data + String.fromCharCode(byte), ""));
            return `data:image/*;base64,${data}`;
        } else {
            return undefined;
        }
    });
}
