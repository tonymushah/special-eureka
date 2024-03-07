import { graphql } from "@mangadex/gql";

const query = graphql(/* GraphQL */ `
	query recentlyAddedHomeQuery {
		home {
			recentlyAdded(params: { limit: 15 }) {
				data {
					id
					attributes {
						title
					}
					relationships {
						coverArt {
							id
							attributes {
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
