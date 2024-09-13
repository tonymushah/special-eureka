<script lang="ts">
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import MangaListContent from "./MangaListContent.svelte";
	import type { MangaListContentItemProps } from "./MangaListContent.svelte";
	import MangaListTabSelect from "./tab-select/MangaListTabSelect.svelte";

	export let list: MangaListContentItemProps[] = [];
</script>

<article>
	<div class="tab-title">
		<div class="tab-additional-content">
			<slot>
				<span>:3</span>
			</slot>
		</div>
		<MangaListTabSelect />
	</div>
	<MidToneLine />
	<MangaListContent bind:list />
</article>

<style lang="scss">
	div.tab-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
