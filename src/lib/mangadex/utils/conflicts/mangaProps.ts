import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
import { hasConflicts, type ContentProfileConflicts } from "../conflicts";
import {
	ContentProfileWarningMode,
	ContentRating,
	type ContentProfile,
	type ReadingStatus
} from "@mangadex/gql/graphql";
import { isInLibrarySync, isInLibraryUnlessDroppedSync } from "@mangadex/gql-docs/library/isIn";

type GetTitleConflictsFromMangaListContentItemPropsParams = {
	title: MangaListContentItemProps;
	library: Map<string, ReadingStatus>;
	profile: ContentProfile;
	warningMode: ContentProfileWarningMode;
};

export function getTitleConflictsFromMangaListContentItemProps({
	title,
	library,
	profile: $profile,
	warningMode
}: GetTitleConflictsFromMangaListContentItemPropsParams): ContentProfileConflicts | null {
	const tags = title.tags;
	switch (warningMode) {
		case ContentProfileWarningMode.Never:
			return null;
			break;
		case ContentProfileWarningMode.Autl:
			if (isInLibrarySync(title.id, library)) {
				return null;
			}
			break;
		case ContentProfileWarningMode.AutlNd:
			if (isInLibraryUnlessDroppedSync(title.id, library)) {
				return null;
			}
			break;
		default:
			break;
	}
	const originalLanguage = title.language;
	const status = title.status;
	const publicationDemographic = title.publicationDemographic;
	const contentRating = title.contentRating ?? ContentRating.Safe;
	const excludedTags = tags.filter((tag) => $profile.excludedTags.some((t) => t == tag.id));

	return {
		tags: excludedTags,
		originalLanguage:
			($profile.originalLanguages.some((value) => originalLanguage == value) == false ||
				$profile.excludedOriginalLanguage.some((value) => originalLanguage == value) ==
					true) &&
			$profile.originalLanguages.length != 0 &&
			$profile.excludedOriginalLanguage.length != 0
				? originalLanguage
				: undefined,
		status:
			$profile.status.some((value) => value == status) == false && $profile.status.length != 0
				? status
				: undefined,
		publicationDemographic:
			$profile.publicationDemographic.some((value) => value == publicationDemographic) ==
				false && $profile.publicationDemographic.length != 0
				? publicationDemographic
				: undefined,
		contentRating:
			$profile.contentRating.some((value) => value == contentRating) == false &&
			$profile.contentRating.length != 0
				? contentRating
				: undefined
	};
}

export function updateTitleBlur(
	options: GetTitleConflictsFromMangaListContentItemPropsParams
): MangaListContentItemProps {
	const conflicts = getTitleConflictsFromMangaListContentItemProps(options);
	return {
		blur: hasConflicts(conflicts),
		...options.title
	};
}
