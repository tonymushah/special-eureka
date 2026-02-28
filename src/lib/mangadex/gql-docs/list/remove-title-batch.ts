import { graphql } from "@mangadex/gql/gql";

export const removeTitlesFromCustomListMutationGQLDoc = graphql(`
	mutation removeTitlesFromCustomList($customListId: UUID!, $titlesIds: [UUID!]!) {
		customList {
			removeMangaBatch(listId: $customListId, mangaIds: $titlesIds)
		}
	}
`);
