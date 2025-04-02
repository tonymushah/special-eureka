import { graphql } from "@mangadex/gql";

export const subscription = graphql(`
	subscription chapterQualitySubscription {
		watchChapterQuality
	}
`)

export const mutation = graphql(`
	mutation chapterQualityMutation($quality: DownloadMode) {
		userOption {
			setChapterQuality(quality: $quality)
		}
	}
`);