import { query as defaultProfileQuery } from "@mangadex/content-profile/graphql/defaultProfile/query";
import isInLibrary, { isInLibraryUnlessDropped } from "@mangadex/gql-docs/library/isIn";
import { ContentProfileWarningMode, ContentRating, Demographic, Language, MangaState, MangaStatus, type ContentProfile } from "@mangadex/gql/graphql";
import getContentProfileWarningMode from "@mangadex/utils/contentProfileWarningMode";
import type { Tag } from "@mangadex/utils/types/Tag";
import type { Client } from "@urql/svelte";

export type ContentProfileConflicts = {
	tags: Tag[];
	originalLanguage: Language | undefined;
	status: MangaStatus | undefined;
	publicationDemographic: Demographic | undefined;
	contentRating: ContentRating | undefined;
}

export default async function getTitleConflicts({ client, title, id }: { client: Client; title: { __typename?: "MangaObject"; id: any; attributes: { __typename?: "GraphQLMangaAttributes"; title: any; status: MangaStatus; state: MangaState; originalLanguage: Language; contentRating?: ContentRating | null; publicationDemographic?: Demographic | null; tags: Array<{ __typename?: "Tag"; id: any; attributes: { __typename?: "TagAttributes"; name: any; }; }>; }; }; id: string; }): Promise<ContentProfileConflicts | null> {
	const $profile = await client
		.query(defaultProfileQuery, {})
		.toPromise()
		.then((res) => {
			if (res.data) {
				return res.data.userOption.getDefaultContentProfile;
			}
			if (res.error) {
				throw res.error;
			}
			throw new Error("Can't do anything");
		});
	const tags = title.attributes.tags.map<Tag>((t) => ({
		id: t.id,
		name: t.attributes.name.en
	}));
	const warningMode = await getContentProfileWarningMode(client);
	switch (warningMode) {
		case ContentProfileWarningMode.Never:
			return null;
			break;
		case ContentProfileWarningMode.Autl:
			if (await isInLibrary(id)) {
				return null;
			}
			break;
		case ContentProfileWarningMode.AutlNd:
			if (await isInLibraryUnlessDropped(id)) {
				return null;
			}
			break;
		default:
			break;
	}
	const originalLanguage = title.attributes.originalLanguage;
	const status = title.attributes.status;
	const publicationDemographic = title.attributes.publicationDemographic != null
		? title.attributes.publicationDemographic
		: undefined;
	const contentRating = title.attributes.contentRating != null ||
		title.attributes.contentRating != undefined
		? title.attributes.contentRating
		: ContentRating.Safe;
	const excludedTags = tags.filter((tag) => $profile.excludedTags.some((t) => t == tag.id)
	);

	return {
		tags: excludedTags,
		originalLanguage: ($profile.originalLanguages.some((value) => originalLanguage == value) ==
			false ||
			$profile.excludedOriginalLanguage.some(
				(value) => originalLanguage == value
			) == true) &&
			$profile.originalLanguages.length != 0 &&
			$profile.excludedOriginalLanguage.length != 0
			? originalLanguage
			: undefined,
		status: $profile.status.some((value) => value == status) == false &&
			$profile.status.length != 0
			? status
			: undefined,
		publicationDemographic: $profile.publicationDemographic.some(
			(value) => value == publicationDemographic
		) == false && $profile.publicationDemographic.length != 0
			? publicationDemographic
			: undefined,
		contentRating: $profile.contentRating.some((value) => value == contentRating) == false &&
			$profile.contentRating.length != 0
			? contentRating
			: undefined
	};
}

export function hasConflicts(conflicts: ContentProfileConflicts | null): boolean {
	if (conflicts == null) {
		return false;
	}
	if (
		conflicts.contentRating != undefined ||
		conflicts.originalLanguage != undefined ||
		conflicts.publicationDemographic != undefined ||
		conflicts.status != undefined ||
		conflicts.tags.length != 0
	) {
		return true;
	} else {
		return false;
	}
}