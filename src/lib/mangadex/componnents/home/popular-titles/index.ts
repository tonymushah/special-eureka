import { graphql } from "@mangadex/gql/exports";

export const popular_title_query = graphql(`
	query homePopularTitle {
		home {
			popularTitles {
				data {
					id
					attributes {
						title
						tags {
							id
							attributes {
								name
							}
						}
						contentRating
						description
					}
					relationships {
						authorArtists {
							id
							attributes {
								name
							}
						}
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
