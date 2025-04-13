import { graphql } from "@mangadex/gql";

export const mangaTasksSubQuery = graphql(`
	subscription listenToMangaTasksIDs {
		watchMangaTasksList
	}
`);

export const chapterTasksSubQuery = graphql(`
	subscription listenToChapterTasksIDs {
		watchChaptersTasksList
	}
`);

export const coverTasksSubQuery = graphql(`
	subscription listenToCoverTasksIDs {
		watchCoverTasksList
	}
`);
