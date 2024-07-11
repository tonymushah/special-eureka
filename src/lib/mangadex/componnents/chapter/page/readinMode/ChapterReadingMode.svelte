<script lang="ts">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { getCurrentChapterReadingMode } from "../contexts/currentChapterReadingMode";
	import DoublePage from "./doublePage/DoublePage.svelte";
	import { fade } from "svelte/transition";
	import LongStrip from "./longStrip/LongStrip.svelte";
	import SinglePage from "./singlePage/SinglePage.svelte";
	import WideStrip from "./wideStrip/WideStrip.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";

	const mode = getCurrentChapterReadingMode();
</script>

{#if $mode == ReadingMode.DoublePage}
	<div transition:fade>
		<DoublePage />
	</div>
{:else if $mode == ReadingMode.LongStrip}
	<div transition:fade>
		<LongStrip />
	</div>
{:else if $mode == ReadingMode.SinglePage}
	<div transition:fade>
		<SinglePage />
	</div>
{:else if $mode == ReadingMode.WideStrip}
	<div transition:fade>
		<WideStrip />
	</div>
{:else}
	<div class="none-selected">
		<div>
			<Title>No reading mode was selected</Title>
			<p>Please select one</p>
		</div>
	</div>
{/if}

<style lang="scss">
	div:not(.none-selected) {
		display: contents;
	}
	div.none-selected {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		div {
			display: block;
		}
	}
</style>
