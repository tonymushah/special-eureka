import { graphql } from "@mangadex/gql/gql";

export const assembleCustomListsTitlesIntoOneGQLDoc = graphql(`
	mutation assembleCustomListsTitlesIntoOne(
		$ids: [UUID!]!
		$newListName: String!
		$visibility: CustomListVisibility
		$filterContent: Boolean
	) {
		customList {
			assembleCustomListsIntoOne(
				toAssemble: $ids
				name: $newListName
				visibility: $visibility
				filterContent: $filterContent
			) {
				id
				attributes {
					visibility
				}
			}
		}
	}
`);
