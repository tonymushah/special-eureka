<script lang="ts">
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { ChapterFeedStyle } from "@mangadex/gql/graphql";
	import { type Writable } from "svelte/store";
	import type { ChapterFeedListItem } from ".";
	import ChapterFeedElement2 from "../element2/ChapterFeedElement2.svelte";
	import ChapterFeedElement3 from "../element3/ChapterFeedElement3.svelte";
	import ChapterFeedListSelector from "./select/ChapterFeedListSelector.svelte";

	export let list: ChapterFeedListItem[] = [];
	export let style: Writable<ChapterFeedStyle>;
	$: coverfull = $style == ChapterFeedStyle.CoverFull;
	$: coverless = $style == ChapterFeedStyle.CoverLess;
	$: isEmpty = list.length == 0;
</script>

<section>
	<div class="tab-title">
		<div class="tab-additional-content">
			<slot>
				<span>:3</span>
			</slot>
		</div>
		<ChapterFeedListSelector {style} />
	</div>
	<MidToneLine />
	<section class="content" class:coverfull class:coverless class:isEmpty>
		{#each list as item}
			{#if coverfull}
				<ChapterFeedElement2
					title={item.title}
					chapters={item.chapters}
					coverImage={item.coverImage}
					coverImageAlt={item.coverImageAlt}
					mangaLang={item.mangaLang}
					mangaId={item.mangaId}
					on:download
					on:downloadKeyPress
					on:mangaClick
					on:mangaClick
					on:mangaKeyPress
					on:read
					on:readKeyPress
				/>
			{:else if coverless}
				<ChapterFeedElement3
					title={item.title}
					chapters={item.chapters}
					mangaLang={item.mangaLang}
					mangaId={item.mangaId}
					on:download
					on:downloadKeyPress
					on:mangaClick
					on:mangaClick
					on:mangaKeyPress
					on:read
					on:readKeyPress
				/>
			{/if}
		{/each}
	</section>
</section>

<style lang="scss">
	div.tab-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.content {
		display: grid;
		gap: 10px;
	}
	section {
		--chapter-layout: var(--accent-l3);
		--chapter-layout-hover: var(--accent-l3-hover);
		--chapter-layout-active: var(--accent-l3-active);
	}
</style>
