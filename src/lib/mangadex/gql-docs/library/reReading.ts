import { graphql } from "@mangadex/gql/gql";

const libraryReReadingQuery = graphql(`
	query currentUserLibraryReReading($param: UserLibrarySectionParam) {
		library{
			reReading(param: $param) {
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

export default libraryReReadingQuery;