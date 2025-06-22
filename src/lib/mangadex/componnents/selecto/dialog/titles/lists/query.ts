import { graphql } from "@mangadex/gql";

export const addToListBatch = graphql(`
	mutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {
		customList {
			addMangaBatch(listId: $customList, mangaIds: $mangas)
		}
	}
`);
