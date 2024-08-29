<script>
	import { writable } from "svelte/store";
	import { initMangaSearchYearContextStore } from "../../contexts/year";
	import Year from "../Year.svelte";

	const year = initMangaSearchYearContextStore(writable(null));
</script>

<Year />
