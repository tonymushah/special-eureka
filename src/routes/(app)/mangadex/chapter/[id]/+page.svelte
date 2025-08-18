<script lang="ts">
	/*import ChapterPagesTest from "./ChapterPagesTest.svelte";*/

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

<!--
<ChapterPagesTest data={$chap} />
-->

{#if $isFixed && !$open}
	<OpenMenuButton left={$isSidebarRtl} />
{/if}

<main class:notFixed={!$isFixed}>
	<ChapterPage />
</main>

<style lang="scss">
	main {
		display: contents;
	}
</style>
