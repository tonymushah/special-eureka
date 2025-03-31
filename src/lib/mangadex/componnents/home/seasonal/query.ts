import { graphql } from "@mangadex/gql/exports";

const query = graphql(/* GraphQL */ `
	query seasonal {
		home {
			seasonal {
				id
				relationships {
					titles {
						id
						attributes {
							title
							altTitles
							description
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
	}
`);

export default query;
