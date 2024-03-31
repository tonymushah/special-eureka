<script lang="ts" context="module">
	export type MangaCoversItem = {
		coverImage: Readable<string | undefined>;
		title: string;
		alt: string;
	};
	type MangaCoversItems = MangaCoversItem[];
</script>

<script lang="ts">
	import CoverImage from "./CoverImage.svelte";
	import type { Readable } from "svelte/store";

	export let items: MangaCoversItems;
	export let flex: boolean = true;
</script>

<div class:flex>
	{#each items as { coverImage, title, alt } (title)}
		<CoverImage {coverImage} {title} {alt} />
	{/each}
</div>

<style lang="scss">
	div {
		display: contents;
	}
	div.flex {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
