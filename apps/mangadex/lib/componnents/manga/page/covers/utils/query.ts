import { graphql } from "@mangadex/gql/exports";

const getMangaCoversQuery = graphql(`
	query getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {
		cover {
			list(
				params: {
					mangaIds: [$id]
					offset: $offset
					limit: $limit
					order: { volume: ASCENDING }
				}
			) {
				data {
					id
					attributes {
						description
						fileName
						volume
						locale
					}
				}
				total
				offset
				limit
			}
		}
	}
`);

export default getMangaCoversQuery;
