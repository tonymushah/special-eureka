<script lang="ts">
	import type { PortalConfig } from "@melt-ui/svelte/internal/actions";
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
		portal?: PortalConfig | null;
	}

	const original = getMangaSearchOriginalLanguageContextWritableStore();
	const excludedOriginal = getMangaSearchExcludedOriginalLanguageContextWritableStore();
	const availableTranslation = getMangaSearchAvailableTranslatedLanguageContextWritableStore();

	let {
		originalTitle = "Original Language",
		excludedTitle = "Excluded Original Language",
		availableTranslatedTitle = "Available Translated Language",
		placement,
		portal
	}: Props = $props();
</script>

<LanguagesBase selecteds={original} title={originalTitle} {placement} {portal} />

<LanguagesBase selecteds={excludedOriginal} title={excludedTitle} {placement} {portal} />

<LanguagesBase
	selecteds={availableTranslation}
	title={availableTranslatedTitle}
	{placement}
	{portal}
/>
