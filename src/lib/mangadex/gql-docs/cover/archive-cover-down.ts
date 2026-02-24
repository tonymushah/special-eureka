import { graphql } from "@mangadex/gql/gql";

export const saveCoversInArchiveGQLDoc = graphql(`
	mutation saveCoversInArchive(
		$ids: [UUID!]!
		$archivePath: String!
		$options: CoverArtSaveOption
	) {
		cover {
			saveImagesToArchive(coverIds: $ids, archiveFile: $archivePath, options: $options)
		}
	}
`);
