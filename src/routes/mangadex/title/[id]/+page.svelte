<script lang="ts">
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import Aggregate from "@mangadex/componnents/manga/page/chapters/aggreate/Aggregate.svelte";
</script>

<article class="layout">
	<section class="info">
		<MangaPageInfo />
	</section>
	<section class="chapters">
		<Aggregate />
	</section>
</article>

<style lang="scss">
	.layout {
		display: grid;
		column-gap: 10px;
		grid-template-columns: repeat(3, 1fr);
		.chapters {
			grid-column: 2/4;
			--chapter-layout: var(--accent-l3);
			--chapter-layout-hover: var(--accent-l3-hover);
			--chapter-layout-active: var(--accent-l3-active);
		}
	}
	@media screen and (max-width: 1200px) {
		.layout {
			display: block;
			.info {
				display: none;
			}
		}
	}
</style>
