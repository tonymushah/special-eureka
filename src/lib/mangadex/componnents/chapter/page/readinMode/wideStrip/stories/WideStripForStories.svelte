<script lang="ts">
	import { onMount } from "svelte";
	import { initChapterImageContext } from "../../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../../stores/readingDirection";
	import Page from "../WideStrip.svelte";
	import { derived } from "svelte/store";
	import { currentChapterPage } from "../../../stores/currentPage";
	export let images: string[];
	const currentPage = derived(currentChapterPage, (page) => page + 1);
	initChapterImageContext(images);
</script>

<p>
	Current Page: {$currentPage}
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
