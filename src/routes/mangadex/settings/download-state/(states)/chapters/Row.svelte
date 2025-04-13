<script lang="ts">
	import { ChapterDownload, ChapterDownloadState } from "@mangadex/download/chapter";
	import type { TableData } from "../Chapters.svelte";
	import { startCase } from "lodash";
	import ActionButton from "./row/ActionButton.svelte";

	interface Props extends TableData {}
	let { id, title: title_store }: Props = $props();
	const downlaod = ChapterDownload.defered(id);
	const donwload_state = downlaod.state();
	let title: string | undefined = $state();
	$effect(() =>
		title_store.subscribe((e) => {
			title = e;
		})
	);
	const download_state_images = downlaod.download_state_images();
</script>

<tr
	class:hasImages={$download_state_images.hasImages}
	style="--status-left: {$download_state_images.left}; --status-right: {$download_state_images.right};"
>
	<td>{id}</td>
	<td>{startCase(ChapterDownloadState[$donwload_state])}</td>
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
