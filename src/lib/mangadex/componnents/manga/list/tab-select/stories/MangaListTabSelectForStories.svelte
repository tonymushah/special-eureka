<script lang="ts">
	import { run } from 'svelte/legacy';

	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { initMangaListStyleContext } from "../../contexts/style";
	import { writable } from "svelte/store";
	import MangaListTabSelect from "../MangaListTabSelect.svelte";

	let { style = MangaListStyle.Grid } = $props();
	const styleContext = initMangaListStyleContext(writable(style));
	run(() => {
		styleContext.set(style);
	});
</script>

<MangaListTabSelect />
