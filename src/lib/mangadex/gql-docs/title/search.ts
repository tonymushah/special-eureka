import { graphql } from "@mangadex/gql/exports";

export const defaultQuery = graphql(`
	query defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {
		manga {
			list(params: $params, excludeContentProfile: $excludeContentProfile) {
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

export const offlineQuery = graphql(`
	query offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {
		manga {
			listOffline(params: $params, excludeContentProfile: $excludeContentProfile) {
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
