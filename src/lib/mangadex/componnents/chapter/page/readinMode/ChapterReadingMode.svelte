<script lang="ts">
	import { ReadingMode } from "@mangadex/gql/graphql";
	import { getCurrentChapterReadingMode } from "../contexts/currentChapterReadingMode";
	import DoublePage from "./doublePage/DoublePage.svelte";
	import { fade } from "svelte/transition";
	import LongStrip from "./longStrip/LongStrip.svelte";
	import SinglePage from "./singlePage/SinglePage.svelte";
	import WideStrip from "./wideStrip/WideStrip.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { derived } from "svelte/store";
	import { isDrawerOpen } from "../contexts/isDrawerOpen";
	import { isDrawerFixed } from "../contexts/isDrawerFixed";
	import SomeDiv from "@mangadex/componnents/theme/SomeDiv.svelte";
	import { headerHeight } from "../top-info/ChapterPageHeader.svelte";
	import {
		fireChapterNextEvent,
		fireChapterPreviousEvent
	} from "../contexts/previousNextEventTarget";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";

	const mode = getCurrentChapterReadingMode();
	const opened = derived([isDrawerOpen(), isDrawerFixed()], ([$open, $fixed]) => $open && $fixed);
	const isShouldFixed = derived(isDrawerFixed(), ($fixed) => !$fixed);
	const headerHeight_ = derived([headerHeight, isDefaultDecoration], ([$h, decorated]) => {
		if ($h != 0) {
			return !decorated ? $h : $h + 30;
		} else {
			return !decorated ? 0 : 30;
		}
	});
	$: open = $opened;
	$: toRemoveHeight = `${$headerHeight_}px`;
</script>

<SomeDiv --to-remove-height={"0"}>
	{#if $mode == ReadingMode.DoublePage}
		<div transition:fade class:fixed={$isShouldFixed}>
			<DoublePage
				on:next={() => {
					fireChapterNextEvent();
				}}
				on:previous={() => {
					fireChapterPreviousEvent();
				}}
			/>
		</div>
	{:else if $mode == ReadingMode.LongStrip}
		<div class="" transition:fade class:fixed={$isShouldFixed}>
			<LongStrip />
		</div>
	{:else if $mode == ReadingMode.SinglePage}
		<div transition:fade class:fixed={$isShouldFixed}>
			<SinglePage
				on:next={() => {
					fireChapterNextEvent();
				}}
				on:previous={() => {
					fireChapterPreviousEvent();
				}}
			/>
		</div>
	{:else if $mode == ReadingMode.WideStrip}
		<div class="wide" transition:fade class:open class:fixed={$isShouldFixed}>
			<WideStrip />
		</div>
	{:else}
		<div class:fixed={$isShouldFixed} class="none-selected">
			<div>
				<Title>No reading mode was selected</Title>
				<p>Please select one</p>
			</div>
		</div>
	{/if}
</SomeDiv>

<style lang="scss">
	div:not(.none-selected, .wide) {
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
	div.wide {
		transition-duration: 0.3s;
		transition-property: width;
		transition-timing-function: ease-in-out;
		width: 100%;
		overflow-x: scroll;
	}
</style>
