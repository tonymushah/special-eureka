import { graphql } from "@mangadex/gql/gql";

const tagTopTenQuery = graphql(`
	query tagTopTenQuery($id: UUID!) {
		tag {
			page(id: $id) {
				topTen {
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

export default tagTopTenQuery;
