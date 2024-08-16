<script lang="ts">
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
	<MangaListContent bind:list />
</article>
