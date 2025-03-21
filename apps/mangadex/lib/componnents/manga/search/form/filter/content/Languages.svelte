<script lang="ts">
	import {
		getMangaSearchAvailableTranslatedLanguageContextWritableStore,
		getMangaSearchExcludedOriginalLanguageContextWritableStore,
		getMangaSearchOriginalLanguageContextWritableStore
	} from "../contexts/languages";
	import LanguagesBase from "./languages/LanguagesBase.svelte";

	interface Props {
		originalTitle?: string;
		excludedTitle?: string;
		availableTranslatedTitle?: string;
		placement?:
			| "top"
			| "top-start"
			| "top-end"
			| "right"
			| "right-start"
			| "right-end"
			| "bottom"
			| "bottom-start"
			| "bottom-end"
			| "left"
			| "left-start"
			| "left-end";
	}

	const original = getMangaSearchOriginalLanguageContextWritableStore();
	const excludedOriginal = getMangaSearchExcludedOriginalLanguageContextWritableStore();
	const availableTranslation = getMangaSearchAvailableTranslatedLanguageContextWritableStore();

	let {
		originalTitle = "Original Language",
		excludedTitle = "Excluded Original Language",
		availableTranslatedTitle = "Available Translated Language",
		placement
	}: Props = $props();
</script>

<LanguagesBase selecteds={original} title={originalTitle} {placement} />

<LanguagesBase selecteds={excludedOriginal} title={excludedTitle} {placement} />

<LanguagesBase selecteds={availableTranslation} title={availableTranslatedTitle} {placement} />
