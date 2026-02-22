import { graphql } from "@mangadex/gql/gql";

export const downloadMDListsTitlesGQLDoc = graphql(`
	mutation downloadMDListsTitles(
		$listIDs: [UUID!]!
		$extras: MangaDownloadExtras
		$filterContent: Boolean!
	) {
		customList {
			downloadListTitles(extras: $extras, toDowload: $listIDs, filterContent: $filterContent)
		}
	}
`);
