import { graphql } from "@mangadex/gql/gql";

const libraryDroppedQuery = graphql(`
	query currentUserLibraryDropped($param: UserLibrarySectionParam) {
		library{
			dropped(param: $param) {
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

export default libraryDroppedQuery;