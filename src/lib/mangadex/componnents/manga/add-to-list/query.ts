import { graphql } from "@mangadex/gql";

const getUserLoggedCustomListsQuery = graphql(`
	query getUserLoggedCustomLists($offset: Int, $limit: Int) {
		customList {
			currentLoggedLists(params: { limit: $limit, offset: $offset }) {
				data {
					id
					attributes {
						name
						visibility
					}
					relationships {
						titlesIds
					}
				}
				limit
				offset
				total
			}
		}
	}
`);

export default getUserLoggedCustomListsQuery;

export const mutation = graphql(`
	mutation addOrRemoveTitleToCustomList(
		$manga_id: UUID!
		$addTo: [UUID!]!
		$removeFrom: [UUID!]!
	) {
		manga {
			addToListBatch(customLists: $addTo, mangaId: $manga_id)
			removeFromListBatch(customLists: $removeFrom, mangaId: $manga_id)
		}
	}
`);

export const makeListMutation = graphql(`
	mutation createCustomList($mangaId: UUID!, $visibility: CustomListVisibility!, $name: String!) {
		customList {
			create(params: { manga: [$mangaId], visibility: $visibility, name: $name }) {
				id
			}
		}
	}
`);
