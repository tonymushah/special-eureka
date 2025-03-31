<script lang="ts">
	import ChapterPage from "@mangadex/componnents/chapter/page/ChapterPage.svelte";
	import { isDrawerFixed } from "@mangadex/componnents/chapter/page/contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "@mangadex/componnents/chapter/page/contexts/isDrawerOpen";
	import registerPreviousNextChapterEvent from "@mangadex/componnents/chapter/page/contexts/registerPreviousNextChapterEvent";
	import registerSelectChapterEvent from "@mangadex/componnents/chapter/page/contexts/registerSelectChapterEvent";
	import OpenMenuButton from "@mangadex/componnents/chapter/page/open-menu/OpenMenuButton.svelte";
	import defaultBehavior from "@mangadex/componnents/sidebar/states/actions";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import { onDestroy, onMount } from "svelte";

	const isFixed = isDrawerFixed();
	const open = isDrawerOpenWritable();
	const unregister = registerPreviousNextChapterEvent();
	onMount(() => registerSelectChapterEvent());
	onDestroy(() => {
		defaultBehavior();
		unregister();
	});
</script>

{#if $isFixed && !$open}
	<OpenMenuButton left={$isSidebarRtl} />
{/if}

<main class:notFixed={!$isFixed}>
	<ChapterPage />
</main>

<style lang="scss">
	main:not(.notFixed) {
		padding-top: 0px;
	}
	main.notFixed {
		padding: 10px;
		padding-top: 10px;
	}
</style>
