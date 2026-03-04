<script lang="ts">
	import MangaDownload, { MangaDownloadState } from "@mangadex/download/manga.svelte";
	import { startCase } from "lodash";
	import type { TableData } from "../Mangas.svelte";
	import ActionButton from "./row/ActionButton.svelte";
	import { IsInViewport } from "runed";

	interface Props extends TableData {}
	let { id, title: title_store }: Props = $props();

	let layout = $state<HTMLElement | undefined>();
	let isInViewport = new IsInViewport(() => layout);
	let mangaDownload = new MangaDownload(
		() => id,
		() => isInViewport.current
	);
	let title: string | undefined = $state();
	$effect(() =>
		title_store.subscribe((e) => {
			title = e;
		})
	);
</script>

<tr bind:this={layout}>
	<td>{id}</td>
	<td>{startCase(MangaDownloadState[mangaDownload.mangaDownloadState])}</td>
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
	tr {
		background-color: var(--accent-l2);
	}
	tr:hover {
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
