<script lang="ts">
	import { derived as der, writable } from "svelte/store";
	import { initDefaultChapterCurrentPageContext } from "../../../contexts/currentPage";
	import { initChapterImageContext } from "../../../contexts/images";
	import Page from "../WideStrip.svelte";
	import { Direction as ReadingDirection } from "@mangadex/gql";
	import { initCurrentChapterDirection } from "../../../contexts/readingDirection";
	interface Props {
		images: string[];
		currentPage?: number;
		direction?: ReadingDirection;
	}

	let {
		images = $bindable(),
		currentPage = $bindable(0),
		direction = $bindable(ReadingDirection.Ltr)
	}: Props = $props();

	const readingDirection = initCurrentChapterDirection(writable(direction));
	const currentChapterPage = initDefaultChapterCurrentPageContext();
	$effect(() => {
		currentChapterPage.set(currentPage);
	});
	const currentPageDerived = der(currentChapterPage, (page) => page + 1);
	initChapterImageContext(images);
</script>

<p>
	Current Page: {$currentPageDerived}
	<button
		onclick={() => {
			if ($readingDirection == ReadingDirection.Ltr) {
				$currentChapterPage--;
			} else {
				$currentChapterPage++;
			}
		}}>{"<-"}</button
	>
	<button
		onclick={() => {
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
	onclick={() => {
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
