<script lang="ts">
	import ChapterPage from "@mangadex/componnents/chapter/page/ChapterPage.svelte";
	import defaultBehavior from "@mangadex/componnents/sidebar/states/actions";
	import { onDestroy } from "svelte";

	onDestroy(() => {
		defaultBehavior();
	});
</script>

<main>
	<ChapterPage />
</main>

<style lang="scss">
	main {
		margin: 10px;
	}
</style>
