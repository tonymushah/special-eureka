import { graphql } from "@mangadex/gql/exports";

const query = graphql(/* GraphQL */ `
	query staffPicks {
		home {
			staffPicks {
				id
				relationships {
					titles {
						id
						attributes {
							title
							altTitles
							state
							description
							status
							availableTranslatedLanguages
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
