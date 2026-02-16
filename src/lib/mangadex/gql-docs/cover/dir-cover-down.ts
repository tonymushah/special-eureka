import { graphql } from "@mangadex/gql/gql";

export const downloadCoversInDirectoryGQLDoc = graphql(`
	mutation downloadCoversInADirectory(
		$ids: [UUID!]!
		$exportDir: String!
		$options: CoverArtSaveOption
	) {
		cover {
			saveImages(coverIds: $ids, exportDir: $exportDir, options: $options)
		}
	}
`);

export const downloadCoverInDirectoryGQLDoc = graphql(`
	mutation downloadCoverInADirectory(
		$id: UUID!
		$exportDir: String!
		$options: CoverArtSaveOption
	) {
		cover {
			saveImage(coverId: $id, exportDir: $exportDir, options: $options)
		}
	}
`);
