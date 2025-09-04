import { graphql } from "@mangadex/gql/gql";

const tagRecentlyAddedQuery = graphql(`
	query tagRecentlyPopularQuery($id: UUID!) {
		tag {
			page(id: $id) {
				recentlyAdded {
					id
					attributes {
						title
						tags {
							id
							attributes {
								name
							}
						}
						originalLanguage
						status
						description
						publicationDemographic
						contentRating
						year
						altTitles
					}
					relationships {
						coverArt {
							id
							attributes {
								fileName
								description
							}
						}
						authorArtists {
							id
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`);

export default tagRecentlyAddedQuery;
