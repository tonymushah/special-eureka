import { graphql } from "@mangadex/gql/gql";

const libraryPlanToReadQuery = graphql(`
	query currentUserLibraryPlanToRead($param: UserLibrarySectionParam) {
		library {
			planToRead(param: $param) {
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
						publicationDemographic
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

export default libraryPlanToReadQuery;
