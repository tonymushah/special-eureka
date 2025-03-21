<script lang="ts">
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { initMangaListStyleContext } from "../../contexts/style";
	import { writable } from "svelte/store";
	import MangaListTabSelect from "../MangaListTabSelect.svelte";

	let { style = $bindable(MangaListStyle.Grid) } = $props();
	const styleContext = initMangaListStyleContext(writable(style));
	$effect(() => {
		styleContext.set(style);
	});
</script>

<MangaListTabSelect />
