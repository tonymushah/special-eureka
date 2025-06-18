import { graphql } from "@mangadex/gql";

export const query = graphql(`
	query getChaptersIDsAsFeed($ids: [UUID!]!) {
		chapter {
			listWithGroupByManga(feedContent: false, chapterListParams:  {
				chapterIds: $ids
			}) {
				data {
					manga {
						id
						attributes {
							title
						}
					}
					chapters {
						id
						attributes {
							chapter
							title
							volume
						}
					}
				}
			}
		}
	}
`);
