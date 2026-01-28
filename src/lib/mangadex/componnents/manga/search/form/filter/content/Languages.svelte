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
	}

	const original = getMangaSearchOriginalLanguageContextWritableStore();
	const excludedOriginal = getMangaSearchExcludedOriginalLanguageContextWritableStore();
	const availableTranslation = getMangaSearchAvailableTranslatedLanguageContextWritableStore();

	let {
		originalTitle = "Original Language",
		excludedTitle = "Excluded Original Language",
		availableTranslatedTitle = "Available Translated Language"
	}: Props = $props();
</script>

<LanguagesBase selecteds={original} title={originalTitle} />

<LanguagesBase selecteds={excludedOriginal} title={excludedTitle} />

<LanguagesBase selecteds={availableTranslation} title={availableTranslatedTitle} />
