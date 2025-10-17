import { graphql } from "@mangadex/gql/gql";

export const exportChapterPage = graphql(`
	mutation exportChapterPage($id: UUID!, $page: Int!, $exportPath: String!, $mode: DownloadMode) {
		chapter {
			pagesCache(id: $id, mode: $mode) {
				exportPage(page: $page, exportPath: $exportPath)
			}
		}
	}
`);
