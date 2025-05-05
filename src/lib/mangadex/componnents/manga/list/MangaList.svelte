<script lang="ts">
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import MangaListContent from "./MangaListContent.svelte";
	import type { MangaListContentItemProps } from "./MangaListContent.svelte";
	import MangaListTabSelect from "./tab-select/MangaListTabSelect.svelte";

	interface Props {
		list?: MangaListContentItemProps[] | MangaListContentItemProps[][];
		children?: import("svelte").Snippet;
	}

	let { list, children }: Props = $props();
</script>

<article>
	<div class="tab-title">
		<div class="tab-additional-content">
			{#if children}{@render children()}{:else}
				<span>:3</span>
			{/if}
		</div>
		<MangaListTabSelect />
	</div>
	<MidToneLine />
	<MangaListContent {list} />
</article>

<style lang="scss">
	div.tab-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
