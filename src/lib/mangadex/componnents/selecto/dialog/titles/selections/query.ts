import { graphql } from "@mangadex/gql";

export const query = graphql(`
	query getTitleTitles($titles: [UUID!]!) {
		manga {
			list(params: { mangaIds: $titles }, excludeContentProfile: true) {
				data {
					id
					attributes {
						title
					}
				}
			}
		}
	}
`);
