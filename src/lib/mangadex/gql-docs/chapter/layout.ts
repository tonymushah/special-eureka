import { graphql } from "@mangadex/gql";

const chapterLayoutPageQuery = graphql(`
	query getChapterPageData($id: UUID!) {
		chapter {
			pages(id: $id) {
				data
				dataSaver
			}
			get(id: $id) {
				id
				attributes {
					title
					volume
					chapter
					pages
					translatedLanguage
					externalUrl
					readableAt
				}
				relationships {
					manga {
						id
						attributes {
							title
						}
					}
					scanlationGroups {
						id
						attributes {
							name
						}
					}
					user {
						id
						attributes {
							username
							roles
						}
					}
				}
			}
		}
	}
`);

export default chapterLayoutPageQuery;