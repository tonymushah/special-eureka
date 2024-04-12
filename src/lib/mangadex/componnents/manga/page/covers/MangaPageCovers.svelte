<script lang="ts" context="module">
	export type MangaCoversItem = {
		coverImage: Readable<string | undefined>;
		title: string;
		alt: string;
	};
	type MangaCoversItems = MangaCoversItem[];
	export enum Variant {
		Flex,
		Grid,
		None
	}
</script>

<script lang="ts">
	import CoverImage from "./CoverImage.svelte";
	import type { Readable } from "svelte/store";

	export let items: MangaCoversItems;
	export let variant: Variant = Variant.None;
	export let fixedWidth_: boolean = false;
	$: flex = variant == Variant.Flex;
	$: grid = variant == Variant.Grid;
	$: fixedWidth = !grid || fixedWidth_;
</script>

<div class:flex class:grid>
	{#each items as { coverImage, title, alt } (title)}
		<CoverImage {coverImage} {title} {alt} bind:fixedWidth />
	{/each}
</div>

<style lang="scss">
	div {
		display: contents;
		gap: 10px;
	}
	div.flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	div.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
</style>
