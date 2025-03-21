<script lang="ts">
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import type { MangaListContentItemProps } from "../MangaListContent.svelte";
	import { initMangaListStyleContext } from "../contexts/style";
	import { writable } from "svelte/store";
	import MangaList from "../MangaList.svelte";

	interface Props {
		list?: MangaListContentItemProps[];
		style?: MangaListStyle;
	}

	let { list = $bindable([]), style = $bindable(MangaListStyle.Grid) }: Props = $props();
	const mangaListStyle = initMangaListStyleContext(writable(style));
	$effect(() => {
		mangaListStyle.set(style);
	});
</script>

<MangaList bind:list />
