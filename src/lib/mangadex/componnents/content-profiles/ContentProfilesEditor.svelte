<script lang="ts">
	import { derived, get, type Readable } from "svelte/store";
	import { initMangaSearchContentRatingContextStore } from "../manga/search/form/filter/contexts/contentRating";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import {
		initMangaSearchTagOptionsContextStore,
		TagOptionState,
		type TagOptions,
		type TagOptionsValue
	} from "../manga/search/form/filter/contexts/tags";
	import type { TagGroup } from "@mangadex/gql/graphql";
	import ContentRating from "../manga/search/form/filter/content/ContentRating.svelte";
	import { initMangaSearchPublicationDemographicContextStore } from "../manga/search/form/filter/contexts/publicationDemographic";
	import { initMangaSearchPublicationStatusContextStore } from "../manga/search/form/filter/contexts/publicationStatus";
	import {
		initMangaSearchLanguagesContextStore,
		type MangaSearchLanguages
	} from "../manga/search/form/filter/contexts/languages";
	import PublicationDemographic from "../manga/search/form/filter/content/PublicationDemographic.svelte";
	import PublicationStatus from "../manga/search/form/filter/content/PublicationStatus.svelte";
	import Tags from "../manga/search/form/filter/content/Tags.svelte";
	import Languages from "../manga/search/form/filter/content/Languages.svelte";

	type SimpleTag = {
		id: string;
		name: string;
		group: TagGroup;
	};
	interface Props {
		tags: Readable<SimpleTag[]>;
	}
	let { tags }: Props = $props();
	const contentRatings = derived(defaultContentProfile, ($profile) => $profile.contentRating);
	const originalLanguages = derived(
		defaultContentProfile,
		($profile) => $profile.originalLanguages
	);
	const publicationDemographic = derived(
		defaultContentProfile,
		($profile) => $profile.publicationDemographic
	);
	const includedTags = derived(defaultContentProfile, ($profile) => $profile.includedTags);
	const excludedTags = derived(defaultContentProfile, ($profile) => $profile.excludedTags);
	const statuses = derived(defaultContentProfile, ($profile) => $profile.status);
	const translatedLanguage = derived(
		defaultContentProfile,
		($profile) => $profile.translatedLanguages
	);
	const excludedOriginalLanguage = derived(
		defaultContentProfile,
		($profile) => $profile.excludedOriginalLanguage
	);
	const languages = derived(
		[originalLanguages, translatedLanguage, excludedOriginalLanguage],
		([$original, $translated, $excluded]) => {
			return {
				originalLanguage: $original,
				excludedOriginalLanguage: $excluded,
				availableTranslatedLanguage: $translated
			} as MangaSearchLanguages;
		}
	);

	const tagsStore = derived(
		[includedTags, excludedTags, tags],
		([$includes, $excludes, $tags]) => {
			const tagMap: TagOptions = new Map(
				$tags.map((tag) => [
					tag.id,
					{
						state: TagOptionState.NONE,
						name: tag.name,
						group: tag.group
					} satisfies TagOptionsValue
				])
			);
			$includes.forEach((id) => {
				const inner = tagMap.get(id);
				if (inner) {
					inner.state = TagOptionState.INCLUDE;
					tagMap.set(id, inner);
				}
			});
			$excludes.forEach((id) => {
				const inner = tagMap.get(id);
				if (inner) {
					inner.state = TagOptionState.EXCLUDE;
					tagMap.set(id, inner);
				}
			});
			return tagMap;
		}
	);
	function updateFromTagStore(value: TagOptions) {
		defaultContentProfile.update(($profile) => {
			$profile.includedTags = Array.from(value.entries())
				.filter(([, value]) => {
					return value.state == TagOptionState.INCLUDE;
				})
				.map(([id, _]) => id);
			$profile.excludedTags = Array.from(value.entries())
				.filter(([, value]) => {
					return value.state == TagOptionState.EXCLUDE;
				})
				.map(([id, _]) => id);
			return $profile;
		});
	}
	initMangaSearchContentRatingContextStore({
		subscribe(run, invalidate) {
			return contentRatings.subscribe(run, invalidate);
		},
		set(value) {
			defaultContentProfile.update((profile) => {
				profile.contentRating = value;
				return profile;
			});
		},
		update(updater) {
			defaultContentProfile.update((profile) => {
				profile.contentRating = updater(profile.contentRating);
				return profile;
			});
		}
	});
	initMangaSearchTagOptionsContextStore({
		subscribe(run, invalidate) {
			return tagsStore.subscribe(run, invalidate);
		},
		set(value) {
			updateFromTagStore(value);
		},
		update(updater) {
			updateFromTagStore(updater(get(tagsStore)));
		}
	});
	initMangaSearchPublicationDemographicContextStore({
		subscribe(run, invalidate) {
			return publicationDemographic.subscribe(run, invalidate);
		},
		set(value) {
			defaultContentProfile.update(($profile) => {
				$profile.publicationDemographic = value;
				return $profile;
			});
		},
		update(updater) {
			defaultContentProfile.update(($profile) => {
				$profile.publicationDemographic = updater($profile.publicationDemographic);
				return $profile;
			});
		}
	});
	initMangaSearchPublicationStatusContextStore({
		subscribe(run, invalidate) {
			return statuses.subscribe(run, invalidate);
		},
		set(value) {
			defaultContentProfile.update(($profile) => {
				$profile.status = value;
				return $profile;
			});
		},
		update(updater) {
			defaultContentProfile.update(($profile) => {
				$profile.status = updater($profile.status);
				return $profile;
			});
		}
	});
	initMangaSearchLanguagesContextStore({
		subscribe(run, invalidate) {
			return languages.subscribe(run, invalidate);
		},
		set(value) {
			defaultContentProfile.update(($profile) => {
				$profile.excludedOriginalLanguage = value.excludedOriginalLanguage;
				$profile.originalLanguages = value.originalLanguage;
				$profile.translatedLanguages = value.availableTranslatedLanguage;
				return $profile;
			});
		},
		update(updater) {
			defaultContentProfile.update(($profile) => {
				const value = updater({
					availableTranslatedLanguage: $profile.translatedLanguages,
					originalLanguage: $profile.originalLanguages,
					excludedOriginalLanguage: $profile.excludedOriginalLanguage
				});
				$profile.excludedOriginalLanguage = value.excludedOriginalLanguage;
				$profile.originalLanguages = value.originalLanguage;
				$profile.translatedLanguages = value.availableTranslatedLanguage;
				return $profile;
			});
		}
	});
</script>

<div class="flexed languages">
	<Languages availableTranslatedTitle="Translation Languages" placement="bottom" portal={null} />
</div>

<ContentRating />

<PublicationDemographic />

<PublicationStatus />

<Tags />

<style lang="scss">
	.flexed {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 5px;
	}
</style>
