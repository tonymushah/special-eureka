<script lang="ts">
	import { run } from 'svelte/legacy';

	import { MangaListStyle } from "@mangadex/gql/graphql";
	import type { MangaListContentItemProps } from "../MangaListContent.svelte";
	import { initMangaListStyleContext } from "../contexts/style";
	import { writable } from "svelte/store";
	import MangaList from "../MangaList.svelte";

	interface Props {
		list?: MangaListContentItemProps[];
		style?: MangaListStyle;
	}

	let { list = $bindable([]), style = MangaListStyle.Grid }: Props = $props();
	const mangaListStyle = initMangaListStyleContext(writable(style));
	run(() => {
		mangaListStyle.set(style);
	});
</script>

<MangaList bind:list />
