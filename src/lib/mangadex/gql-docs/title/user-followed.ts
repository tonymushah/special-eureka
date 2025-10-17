import { graphql } from "@mangadex/gql/gql";

export const userFollowedTitlesGQL = graphql(`
	query userFollowedTitles($limit: Int, $offset: Int) {
		follows {
			mangas(params:  {
			   limit: $limit
			   offset: $offset
			}) {
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
