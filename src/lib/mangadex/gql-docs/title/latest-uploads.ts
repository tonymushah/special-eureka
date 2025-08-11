import { graphql } from "@mangadex/gql";

const latest_updates_query = graphql(/* GraphQL */ `
	query latestUploadsPageQuery($offset: Int, $limit: Int) {
		chapter {
			listWithGroupByManga(
				chapterListParams: {
					includeEmptyPages: EXCLUDE
					includeExternalUrl: EXCLUDE
					includeFutureUpdates: EXCLUDE
					includeFuturePublishAt: EXCLUDE
					order: { readableAt: DESCENDING }
					offset: $offset
					limit: $limit
				}
				feedContent: true
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

export default latest_updates_query;