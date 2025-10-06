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

export default libraryUnfilteredQuery;

export const libraryTitleMapQuery = graphql(`
	query libraryTitleMap($status: ReadingStatus) {
		manga {
			getMangaStatus(status: $status) {
				id
				status
			}
		}
	}
`);
