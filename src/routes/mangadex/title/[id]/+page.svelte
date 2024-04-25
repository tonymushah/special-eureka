<script lang="ts">
	import MangaPageInfo from "@mangadex/componnents/manga/page/chapters/MangaPageInfo.svelte";
	import Aggregate from "@mangadex/componnents/manga/page/chapters/aggreate/Aggregate.svelte";
</script>

<div class="layout">
	<div class="info">
		<MangaPageInfo />
	</div>
	<div class="chapters">
		<Aggregate />
	</div>
</div>

<style lang="scss">
	.layout {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		.chapters {
			grid-column: 2/4;
		}
		column-gap: 10px;
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
