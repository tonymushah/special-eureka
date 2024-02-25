<script>
	import PopularTitles from "@mangadex/componnents/home/PopularTitles.svelte";
	import ContextMenuForStories from "@mangadex/componnents/theme/context-menu/stories/ContextMenuForStories.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
</script>

<div class="popular-titles">
	<Title>Popular Titles</Title>
	<div>
		<PopularTitles />
	</div>
</div>

<MidToneLine />

<style lang="scss">
	div.popular-titles {
		margin-top: 0.5em;
		div {
			margin-top: 0.5em;
		}
	}
</style>
