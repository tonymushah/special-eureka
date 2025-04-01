<script lang="ts" module>
	import type { CoverMangaListItemProps } from "./cover/CoverMangaList.svelte";
	import type { LongMangaListItemProps } from "./long/LongMangaList.svelte";
	import type { MediumMangaListElementProps } from "./medium/MediumMangaList.svelte";

	export type MangaListContentItemProps = LongMangaListItemProps &
		CoverMangaListItemProps &
		MediumMangaListElementProps;
</script>

<script lang="ts">
	import ChapterFeedSelecto from "@mangadex/componnents/selecto/ChapterFeedSelecto.svelte";
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { getMangaListStyleContext } from "./contexts/style";
	import CoverMangaList from "./cover/CoverMangaList.svelte";
	import LongMangaList from "./long/LongMangaList.svelte";
	import MediumMangaList from "./medium/MediumMangaList.svelte";

	interface Props {
		list?: MangaListContentItemProps[];
	}

	let { list }: Props = $props();
	const style = getMangaListStyleContext();
	let container: HTMLElement | undefined = $state();
	let selectedChapters: string[] = $state([]);
	let selectedMangas: string[] = $state([]);
</script>

<ChapterFeedSelecto bind:container bind:selectedChapters bind:selectedMangas />

<div class="manga-list-content" bind:this={container}>
	{#if $style == MangaListStyle.Grid}
		<MediumMangaList {list} />
	{:else if $style == MangaListStyle.Rows}
		<LongMangaList {list} />
	{:else if $style == MangaListStyle.Cover}
		<CoverMangaList {list} />
	{/if}
</div>
