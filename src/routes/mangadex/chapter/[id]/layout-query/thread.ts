import { graphql } from "@mangadex/gql/exports";

const chapterPageThread = graphql(`
	query chapterPageThread($id: UUID!) {
		statistics {
			chapter {
				get(id: $id) {
					comments {
						repliesCount
						threadUrl
					}
				}
			}
		}
	}
`);

export default chapterPageThread;
