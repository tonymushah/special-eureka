<script lang="ts">
	import SomeDiv from "@mangadex/componnents/theme/SomeDiv.svelte";
	import readingDirectionWritable from "@mangadex/gql-docs/chapter/layout-query/pageDirection";
	import { Direction, ProgressMode } from "@mangadex/gql/graphql";
	import type { IndexedDoublePageState, IndexedPageState } from "@mangadex/stores/chapter/pages";
	import { isArray, last } from "lodash";
	import { derived as der } from "svelte/store";
	import { isDoublePage } from "../contexts/currentChapterReadingMode";
	import { getChapterCurrentPageContext } from "../contexts/currentPage";
	import { getCurrentChapterDirection } from "../contexts/readingDirection";
	import getChapterDoublePageCurrentPageIndex from "../readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getCurrentChapterImages from "../utils/getCurrentChapterImages";
	import { progressModeStore } from "@mangadex/stores/chapterLayout";
	import { resetZoom } from "../contexts/resetZoomEventTarget";

	const images = getCurrentChapterImages();
	const doublePage = isDoublePage();
	const direction = getCurrentChapterDirection(readingDirectionWritable);
	let isRtl = $derived($direction == Direction.Rtl);
	const currentPage = getChapterCurrentPageContext();
	const doublePageStates = der(images, ($images) => $images.getDoublePageStates());
	const pageStates = der(images, ($images) => $images.getPagesState());
	function hasError(page: [IndexedPageState, IndexedPageState]): boolean {
		return page.some((page) => page.state?.error != undefined);
	}
	function isDoublePageLoaded(page: IndexedDoublePageState): boolean {
		if (isArray(page)) {
			return page.every((page) => page.state?.page != undefined);
		} else {
			return page.state?.page != undefined;
		}
	}
	const currentDoublePage = getChapterDoublePageCurrentPageIndex();
</script>

<SomeDiv --pages={$images.pagesLen}>
	<div
		class="progress-container"
		class:floating={$progressModeStore == ProgressMode.Floating}
		class:hidden={$progressModeStore == ProgressMode.Hidden}
	>
		<div class="progress" class:isRtl>
			{#if $doublePage}
				{@const _first = $images.pagesAsDoublePageIndexes().at(0)}
				<p>
					{#if isArray(_first)}
						{#if isRtl}
							{_first[1] + 1} - {_first[0] + 1}
						{:else}
							{_first[0] + 1} - {_first[1] + 1}
						{/if}
					{:else if typeof _first == "number"}
						{_first + 1}
					{/if}
				</p>
			{:else}
				{@const _last = $images.pagesLen}
				<p>
					{#if _last != undefined}
						1
					{/if}
				</p>
			{/if}
			<div class="progress-inner" class:isRtl>
				{#if $images.pagesLen}
					{#if $doublePage}
						{#each $doublePageStates as page, doublePageIndex}
							{#if isArray(page)}
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div
									class="item"
									class:loaded={isDoublePageLoaded(page)}
									class:hasError={hasError(page)}
									class:aSelect={doublePageIndex < $currentDoublePage}
									class:selected={doublePageIndex == $currentDoublePage}
									onclick={() => {
										$currentPage = page[0].index;
										resetZoom();
									}}
								></div>
							{:else}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<div
									class="item"
									class:loading={page.state == null}
									class:aSelect={page.index < $currentPage}
									class:selected={page.index == $currentPage}
									class:loaded={isDoublePageLoaded(page)}
									class:hasError={page.state?.error != undefined}
									onclick={() => {
										$currentPage = page.index;
										resetZoom();
									}}
								></div>
							{/if}
						{/each}
					{:else}
						{#each $pageStates as page, index}
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<div
								class="item"
								class:loaded={page?.page != undefined}
								class:aSelect={index < $currentPage}
								class:selected={index == $currentPage}
								class:hasError={page?.error != undefined}
								onclick={() => {
									$currentPage = index;
									resetZoom();
								}}
							></div>
						{/each}
					{/if}
				{:else}
					<div class="item loading"></div>
				{/if}
			</div>
			{#if $doublePage}
				{@const _last = last($images.pagesAsDoublePageIndexes())}
				<p>
					{#if isArray(_last)}
						{#if isRtl}
							{_last[1] + 1} - {_last[0] + 1}
						{:else}
							{_last[0] + 1} - {_last[1] + 1}
						{/if}
					{:else if typeof _last == "number"}
						{_last + 1}
					{/if}
				</p>
			{:else}
				{@const _last = $images.pagesLen}
				<p>
					{#if _last != undefined}
						{_last + 1}
					{/if}
				</p>
			{/if}
		</div>
	</div>
</SomeDiv>

<style lang="scss">
	:root {
		--progress-transition-duration: 200ms;
	}
	.progress-container {
		width: 100%;
		position: absolute;
		bottom: 0px;
	}
	.progress-container.floating {
		.progress {
			translate: 0px 48px;
		}
	}
	.progress-container.floating:hover {
		.progress {
			translate: 0px 0px;
		}
	}
	.progress-container.hidden {
		display: none;
	}
	.progress {
		transform: translate ease-in-out var(--progress-transition-duration);
		width: 100%;
		padding: 12px 8px;
		background-color: var(--accent-l1);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
		z-index: 10;
		p {
			margin: 0px;
		}
	}

	.progress.isRtl {
		flex-direction: row-reverse;
	}
	.progress-inner {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		border-radius: 0.25em;
		overflow: hidden;
		gap: 1px;
		height: 15px;
		flex-grow: 1;
	}
	.progress-inner.isRtl {
		flex-direction: row-reverse;
	}
	.item {
		width: 100%;
		background-color: var(--accent-l2);
	}
	.item:hover {
		background-color: var(--accent-l2-hover);
	}
	.item:active {
		background-color: var(--accent-l2-active);
	}
	.item.loading {
		background-color: var(--accent-l3);
	}
	.item.loading:hover {
		background-color: var(--accent-l3-hover);
	}
	.item.loading:active {
		background-color: var(--accent-l3-active);
	}
	.item.loaded {
		background-color: var(--accent-l5);
	}
	.item.loaded:hover {
		background-color: var(--accent-l5-hover);
	}
	.item.loaded:active {
		background-color: var(--accent-l5-active);
	}
	.item.aSelect {
		background-color: var(--primary-l2);
	}
	.item.aSelect:hover {
		background-color: color-mix(in srgb, var(--primary-l2) 90%, transparent 10%);
	}
	.item.aSelect:active {
		background-color: color-mix(in srgb, var(--primary-l2) 75%, transparent 25%);
	}
	.item.selected {
		background-color: var(--primary);
	}
	.item.selected:hover {
		background-color: var(--primary-l1);
	}
	.item.selected:active {
		background-color: var(--primary-l2);
	}
</style>
