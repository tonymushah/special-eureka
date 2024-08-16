<script lang="ts">
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { initMangaListStyleContext } from "../../contexts/style";
	import { writable } from "svelte/store";
	import MangaListTabSelect from "../MangaListTabSelect.svelte";

	export let style = MangaListStyle.Grid;
	const styleContext = initMangaListStyleContext(writable(style));
	$: styleContext.set(style);
</script>

<MangaListTabSelect />
