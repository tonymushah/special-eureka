import { graphql } from "@mangadex/gql/gql";

const libraryCompletedQuery = graphql(`
	query currentUserLibraryCompleted($param: UserLibrarySectionParam) {
		library {
			completed(param: $param) {
				limit
				offset
				total
				data {
					id
					attributes {
						description
						year
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
					}
					relationships {
						coverArt {
							id
							attributes {
								description
								fileName
							}
						}
					}
				}
			}
		}
	}
`);

export default libraryCompletedQuery;
