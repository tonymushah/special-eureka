import { graphql } from "@mangadex/gql/gql";

const libraryUnfilteredQuery = graphql(`
	query currentUserLibraryUnfiltered($param: UserLibrarySectionParam) {
		library {
			unfiltered(param: $param) {
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

export default libraryUnfilteredQuery;
