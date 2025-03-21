import { graphql } from "@mangadex/gql";

export const allTagsQuery = graphql(`
	query allTags {
		tag {
			list {
				data {
					id
					attributes {
						name
						group
					}
				}
			}
		}
	}
`);
