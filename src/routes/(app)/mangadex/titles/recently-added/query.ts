import { graphql } from "@mangadex/gql/exports";

const query = graphql(/* GraphQL */ `
	query recentlyAddedPageQuery($params: MangaListParams) {
		home {
			recentlyAdded(params: $params) {
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

export default query;
