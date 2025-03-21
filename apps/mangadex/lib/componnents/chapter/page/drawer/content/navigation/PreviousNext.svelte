<script lang="ts">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { getCurrentChapterReadingMode } from "../../../contexts/currentChapterReadingMode";
	import DoublePagePreviousNext from "./previous-next/DoublePagePreviousNext.svelte";
	import LongStripPreviousNext from "./previous-next/LongStripPreviousNext.svelte";
	import DefaultPreviousNext from "./previous-next/DefaultPreviousNext.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const readingMode = getCurrentChapterReadingMode();
</script>

{#if $readingMode == ReadingMode.DoublePage}
	<DoublePagePreviousNext>
		{@render children?.()}
	</DoublePagePreviousNext>
{:else if $readingMode == ReadingMode.LongStrip}
	<LongStripPreviousNext>
		{@render children?.()}
	</LongStripPreviousNext>
{:else}
	<DefaultPreviousNext>
		{@render children?.()}
	</DefaultPreviousNext>
{/if}
