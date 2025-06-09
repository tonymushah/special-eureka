import { graphql } from "@mangadex/gql";

export const updateReadingStatus = graphql(`
	mutation updateReadingStatuses($titles: [UUID!]!, $status: ReadingStatus) {
		manga {
			updateReadingStatusBatch(mangaIds: $titles, status: $status)
		}
	}
`);

export const followTitlesBatch = graphql(`
	mutation followTitlesBatch($titles: [UUID!]!) {
		manga {
			followBatch(mangaIds: $titles)
		}
	}
`);

export const unfollowTitlesBatch = graphql(`
	mutation unfollowTitlesBatch($titles: [UUID!]!) {
		manga {
			unfollowBatch(mangaIds: $titles)
		}
	}
`);
