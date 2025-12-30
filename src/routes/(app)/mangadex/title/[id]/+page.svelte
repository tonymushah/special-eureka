<script lang="ts">
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import Aggregate from "@mangadex/componnents/manga/page/chapters/aggreate/Aggregate.svelte";
	import { MangaInfosPositions } from "@mangadex/gql/graphql";
	import { mangaInfoPosition } from "@mangadex/stores/manga-info-position";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
</script>

<article
	class="layout"
	class:left={$mangaInfoPosition == MangaInfosPositions.Left}
	class:right={$mangaInfoPosition == MangaInfosPositions.Right}
	class:beneathDesc={$mangaInfoPosition == MangaInfosPositions.BeneathDescription}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class="info"
		oncontextmenu={registerContextMenuEvent({
			preventDefault: true
		})}
		class:beneathDesc={$mangaInfoPosition == MangaInfosPositions.BeneathDescription}
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
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";
	.layout {
		display: grid;
		column-gap: 10px;
		margin-bottom: 10px;
		.info {
			grid-area: info;
		}
		.chapters {
			grid-area: chapters;
		}
	}

	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "xl")) {
		.layout.left {
			grid-template-areas: "info chapters";
			grid-template-columns: 400px 1fr;
		}
		.layout.right {
			grid-template-areas: "chapters info";
			grid-template-columns: 1fr 400px;
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "xxl")) {
		.layout.left {
			grid-template-columns: 500px 1fr;
		}
		.layout.right {
			grid-template-columns: 1fr 500px;
		}
	}
	@include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "xl")) {
		.layout {
			display: block;
			.info {
				display: none;
			}
		}
	}
	.info.beneathDesc {
		display: none;
	}
	.layout.beneathDesc {
		display: block;
	}
</style>
