import { graphql } from "@mangadex/gql/gql";

export const mangaInfoPositionGQLDoc = graphql(`
	subscription mangaInfoPositionGQLDoc {
		watchMangaInfosPosition
	}
`);

export const setMangaInfoPositionGQLDoc = graphql(`
	mutation setMangaInfoPosition($position: MangaInfosPositions!) {
		userOption {
			setMangaInfosPosition(position: $position)
		}
	}
`);
