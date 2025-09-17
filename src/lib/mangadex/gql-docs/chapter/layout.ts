import { graphql } from "@mangadex/gql";

const chapterLayoutPageQuery = graphql(`
	query getChapterPageData($id: UUID!) {
		chapter {
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
							status
							state
							originalLanguage
							tags {
								id
								attributes {
									name
								}
							}
							contentRating
							publicationDemographic
							isLongstrip
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
