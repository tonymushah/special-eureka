import { derived, type Readable } from "svelte/store";
import {
	getTitleConflictsSync,
	type ContentProfileConflicts,
	type MaybeConflictedTitle
} from "../conflicts";
import contentProfileWarningMode from "@mangadex/stores/contentProfileWarningMode";
import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
import { titleStatusMapQuery } from "@mangadex/gql-docs/library/isIn";
import type { ReadingStatus } from "@mangadex/gql/graphql";

export function conflictsMap(
	lists: Readable<MaybeConflictedTitle[]>
): Readable<Map<string, ContentProfileConflicts>> {
	const libraryMap = derived(
		titleStatusMapQuery,
		(q) => q.data ?? new Map<string, ReadingStatus>()
	);
	return derived(
		[lists, defaultContentProfile, contentProfileWarningMode, libraryMap],
		([$li, $profile, $mode, $lib], set, updater) => {
			$li.forEach((title) => {
				updater((map) => {
					const cons = getTitleConflictsSync({
						title,
						library: $lib,
						warningMode: $mode,
						profile: $profile
					});
					if (cons != null) {
						map.set(title.id, cons);
					}
					return map;
				});
			});
		},
		new Map<string, ContentProfileConflicts>()
	);
}
