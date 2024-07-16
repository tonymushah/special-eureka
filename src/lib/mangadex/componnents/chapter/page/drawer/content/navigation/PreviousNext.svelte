<script lang="ts">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { getCurrentChapterReadingMode } from "../../../contexts/currentChapterReadingMode";
	import DoublePagePreviousNext from "./previous-next/DoublePagePreviousNext.svelte";
	import LongStripPreviousNext from "./previous-next/LongStripPreviousNext.svelte";
	import DefaultPreviousNext from "./previous-next/DefaultPreviousNext.svelte";

	const readingMode = getCurrentChapterReadingMode();
</script>

{#if $readingMode == ReadingMode.DoublePage}
	<DoublePagePreviousNext>
		<slot />
	</DoublePagePreviousNext>
{:else if $readingMode == ReadingMode.LongStrip}
	<LongStripPreviousNext>
		<slot />
	</LongStripPreviousNext>
{:else}
	<DefaultPreviousNext>
		<slot />
	</DefaultPreviousNext>
{/if}
