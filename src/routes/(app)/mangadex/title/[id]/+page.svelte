<script lang="ts">
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import Aggregate from "@mangadex/componnents/manga/page/chapters/aggreate/Aggregate.svelte";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
</script>

<article class="layout">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="info"
		oncontextmenu={registerContextMenuEvent({
			preventDefault: true
		})}
	>
		<MangaPageInfo />
	</section>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="chapters"
		oncontextmenu={registerContextMenuEvent({
			preventDefault: true
		})}
	>
		<Aggregate />
	</section>
</article>

<style lang="scss">
	.layout {
		display: grid;
		column-gap: 10px;
		grid-template-columns: repeat(3, 1fr);
		margin-bottom: 10px;
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
