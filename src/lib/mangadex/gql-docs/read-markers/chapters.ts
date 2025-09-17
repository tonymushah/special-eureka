import { graphql } from "@mangadex/gql/gql";

export const individualChapterSub = graphql(`
	subscription listenToChapterReadMarker($id: UUID!) {
		watchReadMarker(chapterId: $id)
	}
`);

export const anyChapterSub = graphql(`
	subscription listenToAnyChapterReadMarker {
		watchReadMarkers {
			chapter
			read
		}
	}
`);

export const mutateReadMarkersBatch = graphql(`
	mutation mutateReadMarkersBatch($unreads: [UUID!]!, $read: [UUID!]!, $updateHistory: Boolean) {
		readMarker {
			readMarkersBatch(chapterIdsRead: $read, chapterIdsUnread: $unreads, updateHistory: $updateHistory)
		}
	}
`);

export const chaptersReadMarkers = graphql(`
	query chaptersReadMarkers($ids: [UUID!]!) {
		readMarker {
			chapterReadMarkers(chapters: $ids)
		}
	}
`);

export const mangaReadMarkers = graphql(`
	query mangaReadMarkers($id: UUID!) {
		readMarker {
			mangaReadMarkersByMangaId(mangaId: $id)
		}
	}
`);

export const mangasReadMarkers = graphql(`
	query mangasReadMarkers($ids: [UUID!]!) {
		readMarker {
			mangaReadMarkers(mangaIds: $ids)
		}
	}
`);

export const mangasReadMarkersGrouped = graphql(`
	query mangasReadMarkersGrouped($ids: [UUID!]!) {
		readMarker {
			mangaReadMarkersGrouped(mangaIds: $ids) {
				mangaId
				chapters
			}
		}
	}
`);
