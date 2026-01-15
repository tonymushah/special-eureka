import { graphql } from "@mangadex/gql";

const query = graphql(`
	query customListChapterFeed(
		$feedParam: CustomListMangaFeedParams!
		$mangaParam: MangaListParams
		$private: Boolean
		$onlyUnreadTitles: Boolean
	) {
		feed {
			customListFeedGrouped(
				feedParams: $feedParam
				mangaListParams: $mangaParam
				private: $private
				onlyUnreadTitles: $onlyUnreadTitles
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
