<script lang="ts">
	import type { CurrentChapterData } from "@mangadex/componnents/chapter/page/contexts/currentChapter";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import ChapterPages from "@mangadex/stores/chapter/pages";
	import { delay } from "lodash";

	interface Props {
		data: CurrentChapterData;
	}
	let { data }: Props = $props();
	const pages = ChapterPages.initStore(data.id);
</script>

<button
	onclick={() => {
		pages.startCaching().catch((e) => {
			addErrorToast("Error on caching", e);
		});
	}}>Start caching</button
>

<div class="grid">
	<div class="simple">
		<ul>
			{#each $pages.getImages() as img, index}
				<li>
					{index} -
					{#if img != null}
						{@const size = img.size}
						{#if size}
							({size.width} : {size.height})
						{/if}
						<img src={img.value} alt={img.value} />
					{:else}
						<i>Not loaded yet</i>
					{/if}
				</li>
			{:else}
				<p>No pages</p>
			{/each}
		</ul>
	</div>
	<div class="double">
		<ul>
			{#each $pages.pagesAsDoublePageIndexes() as doubles, index}
				<li>
					{index} - {doubles}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	img {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}
	.grid {
		display: grid;
		grid-template-columns: 50% 50%;
	}
</style>
