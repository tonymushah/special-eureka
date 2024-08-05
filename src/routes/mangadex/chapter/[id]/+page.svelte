<script lang="ts">
	import ChapterPage from "@mangadex/componnents/chapter/page/ChapterPage.svelte";
	import { isDrawerFixed } from "@mangadex/componnents/chapter/page/contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "@mangadex/componnents/chapter/page/contexts/isDrawerOpen";
	import OpenMenuButton from "@mangadex/componnents/chapter/page/open-menu/OpenMenuButton.svelte";
	import defaultBehavior from "@mangadex/componnents/sidebar/states/actions";
	import { onDestroy } from "svelte";

	const isFixed = isDrawerFixed();
	const open = isDrawerOpenWritable();
	onDestroy(() => {
		defaultBehavior();
	});
</script>

{#if $isFixed && !$open}
	<OpenMenuButton />
{/if}

<main class:notFixed={!$isFixed}>
	<ChapterPage />
</main>

<style lang="scss">
	main:not(.notFixed) {
		padding-top: 9px;
	}
	main.notFixed {
		padding: 10px;
		padding-top: 10px;
	}
</style>
