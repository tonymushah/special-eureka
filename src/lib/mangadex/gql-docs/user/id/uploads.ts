import { graphql } from "@mangadex/gql/exports";

const query = graphql(`
	query userUploadsFeed(
		$user: UUID!
		$translatedLanguages: [Language!]! = []
		$offset: Int
		$limit: Int
		$order: ChapterSortOrder! = { publishAt: DESCENDING }
		$mangaListParams: MangaListParams = {}
		$disableScanlationGroupBlacklist: Boolean
		$disableUserBlacklist: Boolean
		$disableAuthorArtistBlacklist: Boolean
	) {
		chapter {
			listWithGroupByManga(
				param: {
					chapterListParams: {
						offset: $offset
						limit: $limit
						translatedLanguages: $translatedLanguages
						uploaders: [$user]
						order: $order
					}
					mangaListParams: $mangaListParams
					excludeBlacklistedAuthorArtists: $disableAuthorArtistBlacklist
					excludeBlacklistedScansGroups: $disableScanlationGroupBlacklist
					excludeBlacklistedUsers: $disableUserBlacklist
				}
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

export default query;
