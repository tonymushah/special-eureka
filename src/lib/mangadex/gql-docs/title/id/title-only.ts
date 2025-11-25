import { graphql } from "@mangadex/gql/gql";

export const getMangaTitleOnlyQuery = graphql(`
	query getMangaTitleOnlyQuery($mangaId: UUID!) {
		manga {
			get(id: $mangaId) {
				id
				attributes {
					title
				}
			}
		}
	}
`);
