import { graphql } from "@mangadex/gql";

const mutation = graphql(`
	mutation downloadChapterMutation($id: UUID!, $quality: DownloadMode) {
		chapter {
			download(id: $id, quality: $quality) {
				hasFailed
				isDownloaded
			}
		}
	}
`);

const subscription = graphql(`
	subscription chapterDownloadState($id: UUID!) {
		watchChapterDownloadState(chapterId: $id) {
			isPending
			isDone
			isCanceled
			isOfflineAppStateNotLoaded
			error
			downloading {
				isPreloading
				isFetchingData
				fetchingImage {
					filename
					index
					len
				}
				isFetchingAtHomeData
			}
		}
	}
`)

export class ChapterDownloadState {
	public static mutation() {
		return mutation
	}
	public static subscription() {
		return subscription
	}
}