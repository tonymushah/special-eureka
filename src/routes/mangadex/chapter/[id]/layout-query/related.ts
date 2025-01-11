import { graphql } from "@mangadex/gql/exports";

const relatedChaptersQuery = graphql(`
	query getChapterRelated($mangaId: UUID!, $langs: Language!, $groups: [UUID!]!) {
		manga {
			aggregate(
				params: { groups: $groups, mangaId: $mangaId, translatedLanguage: [$langs] }
			) {
				default(isReversed: true) {
					volumes {
						volume
						chapters {
							chapter
							ids
						}
					}
				}
			}
		}
	}
`);

export default relatedChaptersQuery;
