<script lang="ts" module>
	import type { CoverMangaListItemProps } from "./cover/CoverMangaList.svelte";
	import type { LongMangaListItemProps } from "./long/LongMangaList.svelte";
	import type { MediumMangaListElementProps } from "./medium/MediumMangaList.svelte";

	export type MangaListContentItemProps = LongMangaListItemProps &
		CoverMangaListItemProps &
		MediumMangaListElementProps;
</script>

<script lang="ts">
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { getMangaListStyleContext } from "./contexts/style";
	import CoverMangaList from "./cover/CoverMangaList.svelte";
	import LongMangaList from "./long/LongMangaList.svelte";
	import MediumMangaList from "./medium/MediumMangaList.svelte";

	interface Props {
		list?: MangaListContentItemProps[];
	}

	let { list = $bindable([]) }: Props = $props();
	const style = getMangaListStyleContext();
</script>

<div class="manga-list-content">
	{#if $style == MangaListStyle.Grid}
		<MediumMangaList bind:list />
	{:else if $style == MangaListStyle.Rows}
		<LongMangaList bind:list />
	{:else if $style == MangaListStyle.Cover}
		<CoverMangaList bind:list />
	{/if}
</div>
