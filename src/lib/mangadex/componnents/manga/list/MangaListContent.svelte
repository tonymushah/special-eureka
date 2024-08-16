<script lang="ts" context="module">
	import type { CoverMangaListItemProps } from "./cover/CoverMangaList.svelte";
	import type { LongMangaListItemProps } from "./long/LongMangaList.svelte";
	import type { MediumMangaListElementProps } from "./medium/MediumMangaList.svelte";

	export type MangaListContentItemProps = LongMangaListItemProps &
		CoverMangaListItemProps &
		MediumMangaListElementProps;
</script>

<script lang="ts">
	import { getMangaListStyleContext } from "./contexts/style";
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { blur } from "svelte/transition";
	import MediumMangaList from "./medium/MediumMangaList.svelte";
	import LongMangaList from "./long/LongMangaList.svelte";
	import CoverMangaList from "./cover/CoverMangaList.svelte";

	export let list: MangaListContentItemProps[] = [];
	const style = getMangaListStyleContext();
</script>

<div class="manga-list-content">
	{#if $style == MangaListStyle.Grid}
		<div transition:blur>
			<MediumMangaList bind:list />
		</div>
	{:else if $style == MangaListStyle.Rows}
		<div transition:blur>
			<LongMangaList bind:list />
		</div>
	{:else if $style == MangaListStyle.Cover}
		<div transition:blur>
			<CoverMangaList bind:list />
		</div>
	{/if}
</div>
