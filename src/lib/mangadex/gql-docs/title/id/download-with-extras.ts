import { graphql } from "@mangadex/gql/gql";
import type { MangaDownloadExtras } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";

export const downloadTitleWithExtrasGQLDocs = graphql(`
	mutation downloadTitleWithExtras($mangaId: UUID!, $extras: MangaDownloadExtras) {
		manga {
			download(extras: $extras, id: $mangaId) {
				isDownloaded
				hasFailed
			}
		}
	}
`);

export async function downloadTitleWithExtra(id: string, extras?: MangaDownloadExtras) {
	const res = await client
		.mutation(downloadTitleWithExtrasGQLDocs, {
			mangaId: id,
			extras
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}
