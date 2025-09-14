import { graphql } from "@mangadex/gql/gql";

const libraryOnHoldQuery = graphql(`
	query currentUserLibraryOnHold($param: UserLibrarySectionParam) {
		library {
			onHold(param: $param) {
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

export default libraryOnHoldQuery;
