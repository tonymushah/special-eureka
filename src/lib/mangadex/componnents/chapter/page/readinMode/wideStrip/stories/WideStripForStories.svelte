<script lang="ts">
	import { derived } from "svelte/store";
	import { initDefaultChapterCurrentPageContext } from "../../../contexts/currentPage";
	import { initChapterImageContext } from "../../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../../stores/readingDirection";
	import Page from "../WideStrip.svelte";
	export let images: string[];
	export let currentPage: number = 0;
	const currentChapterPage = initDefaultChapterCurrentPageContext();
	$: {
		currentChapterPage.set(currentPage);
	}
	const currentPageDerived = derived(currentChapterPage, (page) => page + 1);
	initChapterImageContext(images);
</script>

<p>
	Current Page: {$currentPageDerived}
	<button
		on:click={() => {
			if ($readingDirection == ReadingDirection.Ltr) {
				$currentChapterPage--;
			} else {
				$currentChapterPage++;
			}
		}}>{"<-"}</button
	>
	<button
		on:click={() => {
			if ($readingDirection == ReadingDirection.Ltr) {
				$currentChapterPage++;
			} else {
				$currentChapterPage--;
			}
		}}>{"->"}</button
	>
</p>

<p>
	Current mode:
	<span>
		{#if $readingDirection == ReadingDirection.Ltr}
			Left to Right
		{:else}
			Right to Left
		{/if}
	</span>
</p>

<button
	on:click={() => {
		switch ($readingDirection) {
			case ReadingDirection.Ltr:
				readingDirection.set(ReadingDirection.Rtl);
				break;
			case ReadingDirection.Rtl:
				readingDirection.set(ReadingDirection.Ltr);
				break;
			default:
				break;
		}
	}}>switch mode</button
>

<Page />
