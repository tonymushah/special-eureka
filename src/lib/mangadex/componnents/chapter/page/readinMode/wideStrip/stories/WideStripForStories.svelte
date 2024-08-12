<script lang="ts">
	import { derived, writable } from "svelte/store";
	import { initDefaultChapterCurrentPageContext } from "../../../contexts/currentPage";
	import { initChapterImageContext } from "../../../contexts/images";
	import Page from "../WideStrip.svelte";
	import { Direction as ReadingDirection } from "@mangadex/gql";
	import { initCurrentChapterDirection } from "../../../contexts/readingDirection";
	export let images: string[];
	export let currentPage: number = 0;
	export let direction: ReadingDirection = ReadingDirection.Ltr;

	const readingDirection = initCurrentChapterDirection(writable(direction));
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
