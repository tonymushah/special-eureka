<script lang="ts" module>
	export type MangaCoversItem = {
		title: string;
		alt: string;
		id: string;
	};
	type MangaCoversItems = MangaCoversItem[];
</script>

<script lang="ts">
	import CoverImage from "./CoverImage.svelte";
	import { Variant } from "./MangaPageCovers.utils";

	interface Props {
		items: MangaCoversItems;
		variant?: Variant;
		fixedWidth_?: boolean;
	}

	let { items, variant = $bindable(Variant.None), fixedWidth_ = false }: Props = $props();
	let flex = $derived(variant == Variant.Flex);
	let grid = $derived(variant == Variant.Grid);
	let fixedWidth = $derived(flex || fixedWidth_);
</script>

<div class:flex class:grid>
	{#each items as { title, alt, id } (id)}
		<CoverImage coverId={id} {title} {alt} {fixedWidth} />
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
	div.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 10px;
	}
</style>
