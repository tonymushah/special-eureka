<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import {
		getMangaSearchTagExcludeModeContextWritable,
		getMangaSearchTagIncludeModeContextWritable
	} from "../contexts/tagModes";
	import TagModeToggle from "./tagMode/TagModeToggle.svelte";

	const include = getMangaSearchTagIncludeModeContextWritable();
	const exclude = getMangaSearchTagExcludeModeContextWritable();
</script>

<section>
	<div>
		<Title type={3}>Include Tags Mode:</Title>
		<TagModeToggle writableTag={include} />
	</div>

	<div>
		<Title type={3}>Exclude Tags Mode:</Title>
		<TagModeToggle writableTag={exclude} />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
	}
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		gap: 5px;
	}
</style>
