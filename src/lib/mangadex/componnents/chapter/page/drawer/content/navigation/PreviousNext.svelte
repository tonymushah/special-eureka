<script lang="ts">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { getCurrentChapterReadingMode } from "../../../contexts/currentChapterReadingMode";
	import DoublePagePreviousNext from "./previous-next/DoublePagePreviousNext.svelte";
	import DefaultPreviousNext from "./previous-next/DefaultPreviousNext.svelte";
	import {
		fireChapterNextEvent,
		fireChapterPreviousEvent
	} from "@mangadex/componnents/chapter/page/contexts/previousNextEventTarget";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	const readingMode = getCurrentChapterReadingMode();
</script>

{#if $readingMode == ReadingMode.DoublePage}
	<DoublePagePreviousNext onnext={fireChapterNextEvent} onprevious={fireChapterPreviousEvent}>
		{@render children?.()}
	</DoublePagePreviousNext>
{:else}
	<DefaultPreviousNext onnext={fireChapterNextEvent} onprevious={fireChapterPreviousEvent}>
		{@render children?.()}
	</DefaultPreviousNext>
{/if}
