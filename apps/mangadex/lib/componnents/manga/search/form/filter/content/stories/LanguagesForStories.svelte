<script>
	import { writable } from "svelte/store";
	import {
		defaultMangaSearchLanguages,
		initMangaSearchLanguagesContextStore
	} from "../../contexts/languages";
	import Languages from "../Languages.svelte";

	initMangaSearchLanguagesContextStore(writable(defaultMangaSearchLanguages()));
</script>

<Languages />
