<script lang="ts">
	import ChapterDownload, { ChapterDownloadState } from "@mangadex/download/chapter.svelte";
	import { startCase } from "lodash";
	import type { TableData } from "../Chapters.svelte";
	import ActionButton from "./row/ActionButton.svelte";
	import { Debounced, IsInViewport } from "runed";

	interface Props extends TableData {}
	let { id, title: title_store }: Props = $props();
	let layout = $state<HTMLElement | undefined>();
	let isInViewport = new IsInViewport(() => layout);
	let isInViewportDebounced = new Debounced(() => isInViewport.current, 500);
	let downloadInstance = new ChapterDownload(
		() => id,
		() => isInViewportDebounced.current
	);
	let donwload_state = $derived(downloadInstance.state);
	let title: string | undefined = $state();
	$effect(() =>
		title_store.subscribe((e) => {
			title = e;
		})
	);
	let download_state_images = $derived(downloadInstance.chapterDownloadStateImages);
</script>

<tr
	bind:this={layout}
	class:hasImages={download_state_images.hasImages}
	style="--status-left: {download_state_images.left}; --status-right: {download_state_images.right};"
>
	<td>{id}</td>
	<td>{startCase(ChapterDownloadState[donwload_state])}</td>
	<td>
		{#if title}
			{title}
		{:else}
			No title
		{/if}
	</td>
	<td class="actions">
		<ActionButton {id} />
	</td>
</tr>

<style lang="scss">
	tr.hasImages {
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--primary) 50%, var(--accent-l3) 50%) var(--status-left),
			var(--accent-l3) var(--status-right)
		);
	}
	tr:not(.hasImages) {
		background-color: var(--accent-l2);
	}
	tr:hover:not(.hasImages) {
		background-color: var(--accent-l2-hover);
	}
	tr:active {
		background-color: var(--accent-l2-active);
	}
	td {
		border: 2px solid var(--contrast-l1);
		padding: 5px 10px;
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
