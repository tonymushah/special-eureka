import { graphql } from "@mangadex/gql";

export const query = graphql(`
	query userLoggedChapterFeed(
		$translatedLanguages: [Language!]! = []
		$offset: Int
		$limit: Int
		$order: MangaFeedSortOrder! = { publishAt: DESCENDING }
		$mangaListParams: MangaListParams = {}
	) {
		feed {
			userLoggedMangaFeedGrouped(
				feedParams: {
					offset: $offset
					limit: $limit
					order: $order
					translatedLanguage: $translatedLanguages
					includeFutureUpdates: EXCLUDE
				}
				mangaListParams: $mangaListParams
			) {
				limit
				offset
				total
				data {
					manga {
						id
						attributes {
							title
							originalLanguage
							lastVolume
							lastChapter
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
					chapters {
						id
						attributes {
							title
							chapter
							volume
							translatedLanguage
							externalUrl
							createdAt
							readableAt
						}
						relationships {
							scanlationGroups {
								id
								attributes {
									name
								}
							}
							user {
								id
								attributes {
									roles
									username
								}
							}
						}
					}
				}
			}
		}
	}
`);
