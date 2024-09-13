<script lang="ts">
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import type { MangaListContentItemProps } from "../MangaListContent.svelte";
	import { initMangaListStyleContext } from "../contexts/style";
	import { writable } from "svelte/store";
	import MangaList from "../MangaList.svelte";

	export let list: MangaListContentItemProps[] = [];
	export let style: MangaListStyle = MangaListStyle.Grid;
	const mangaListStyle = initMangaListStyleContext(writable(style));
	$: mangaListStyle.set(style);
</script>

<MangaList bind:list />
