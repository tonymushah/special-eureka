<script lang="ts">
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import MangaListContent from "./MangaListContent.svelte";
	import type { MangaListContentItemProps } from "./MangaListContent.svelte";
	import MangaListTabSelect from "./tab-select/MangaListTabSelect.svelte";

	interface Props {
		list?: MangaListContentItemProps[] | MangaListContentItemProps[][];
		additionalContent?: import("svelte").Snippet;
	}

	let { list, additionalContent }: Props = $props();
</script>

<article>
	<div class="tab-title">
		<div class="tab-additional-content">
			{#if additionalContent}{@render additionalContent()}{:else}
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
