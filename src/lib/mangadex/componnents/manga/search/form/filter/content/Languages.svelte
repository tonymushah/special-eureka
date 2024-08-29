<script>
	import {
		getMangaSearchAvailableTranslatedLanguageContextWritableStore,
		getMangaSearchExcludedOriginalLanguageContextWritableStore,
		getMangaSearchOriginalLanguageContextWritableStore
	} from "../contexts/languages";
	import LanguagesBase from "./languages/LanguagesBase.svelte";

	const original = getMangaSearchOriginalLanguageContextWritableStore();
	const excludedOriginal = getMangaSearchExcludedOriginalLanguageContextWritableStore();
	const availableTranslation = getMangaSearchAvailableTranslatedLanguageContextWritableStore();
</script>

<LanguagesBase selecteds={original} title="Original Language" />

<LanguagesBase selecteds={excludedOriginal} title="Excluded Original Language" />

<LanguagesBase selecteds={availableTranslation} title="Available Translated Language" />
