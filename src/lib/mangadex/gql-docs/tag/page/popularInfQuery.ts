import { graphql } from "@mangadex/gql/gql";

const tagPopularTitlesQuery = graphql(`
	query tagPopulatTitlesQuery($id: UUID!,$params: TagPopularList) {
		tag {
			page(id: $id) {
				popularInfSection(params: $params) {
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
	}
`);

export default tagPopularTitlesQuery;