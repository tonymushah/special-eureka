import { graphql } from "@mangadex/gql";

export const subscription = graphql(`
	subscription mangaReadingStatusSubscription($id: UUID!) {
		watchMangaReadingState(mangaId: $id)
	}
`);

export const init_query = graphql(`
	query mangaReadingStatusQuery($id: UUID!) {
		manga {
			readingStatus(id: $id)
		}
	}
`);

export const mutation = graphql(`
	mutation mangaReadingStatusMutation($id: UUID!, $status: ReadingStatus) {
		manga {
			updateReadingStatus(id: $id, status: $status)
		}
	}
`);
