import type { ContentProfile, MangaListParams } from "@mangadex/gql/graphql";
import { defaultMangaFilterParams, mangaFilterParamsFromContentProfile, type MangaSearchFilterParams } from "./filter/contexts";
import { TagOptionState } from "./filter/contexts/tags";

export type MangaSearchParams = {
	title: string | undefined;
	filter: MangaSearchFilterParams;
	offlineOnly: boolean;
};

export function mangaSearchParamsFromContentProfile(contentProfile: ContentProfile): MangaSearchParams {
	return {
		title: undefined,
		filter: mangaFilterParamsFromContentProfile(contentProfile),
		offlineOnly: false
	};
}

export default function defaultMangaSearchParams(): MangaSearchParams {
	return {
		title: undefined,
		filter: defaultMangaFilterParams(),
		offlineOnly: false
	};
}

export function toMangaListParams(params: MangaSearchParams): MangaListParams {
	const tags = Array.from(params.filter.tags.entries());
	const year = (() => {
		if (params.filter.year) {
			let strYear = `${params.filter.year}`;
			if (strYear.length == 0) {
				return null;
			} else {
				let year = Number(strYear);
				if (isNaN(year)) {
					return null;
				} else {
					return year;
				}
			}
		} else {
			return null;
		}
	})();
	return {
		artists: params.filter.authorArtists.artists.map((a) => a.id),
		authors: params.filter.authorArtists.authors.map((a) => a.id),
		availableTranslatedLanguage: params.filter.languages.availableTranslatedLanguage,
		contentRating: params.filter.contentRating,
		excludedOriginalLanguage: params.filter.languages.excludedOriginalLanguage,
		excludedTagsMode: params.filter.tagModes.exclude,
		includedTagsMode: params.filter.tagModes.include,
		publicationDemographic: params.filter.demographic,
		status: params.filter.status,
		year,
		includedTags: tags
			.filter(([, data]) => {
				return data.state == TagOptionState.INCLUDE;
			})
			.map(([id]) => id),
		title: params.title?.length != 0 ? params.title : undefined,
		excludedTags: tags
			.filter(([, data]) => {
				return data.state == TagOptionState.EXCLUDE;
			})
			.map(([id]) => id),
		originalLanguage: params.filter.languages.originalLanguage
	};
}
