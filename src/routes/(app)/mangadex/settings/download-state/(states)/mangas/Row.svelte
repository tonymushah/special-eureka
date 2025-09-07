<script lang="ts">
	import mangaDownloadState, { MangaDownloadState } from "@mangadex/download/manga";
	import { startCase } from "lodash";
	import type { TableData } from "../Mangas.svelte";
	import ActionButton from "./row/ActionButton.svelte";

	interface Props extends TableData {}
	let { id, title: title_store }: Props = $props();

	const donwload_state = mangaDownloadState({ id, deferred: true });
	let title: string | undefined = $state();
	$effect(() =>
		title_store.subscribe((e) => {
			title = e;
		})
	);
</script>

<tr>
	<td>{id}</td>
	<td>{startCase(MangaDownloadState[$donwload_state])}</td>
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
