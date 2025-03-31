<script lang="ts">
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { getTopMangaDownloadContextStore } from "../context";
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";
	import TrashIcon from "./download/TrashIcon.svelte";
	import { createEventDispatcher } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import DownloadIcon from "./download/DownloadIcon.svelte";
	import LoadingIcon from "./download/LoadingIcon.svelte";

	const stateStore = getTopMangaDownloadContextStore();
	const dispatch = createEventDispatcher<{
		download: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		delete: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	let state = $derived($stateStore);
</script>

{#if state == ChapterDownloadState.Downloaded}
	<DangerButton
		isBase
		on:click={({ detail }) => {
			dispatch("delete", detail);
		}}
	>
		<TrashIcon />
	</DangerButton>
{:else if state == ChapterDownloadState.Failed}
	<ButtonAccent
		isBase
		on:click={({ detail }) => {
			dispatch("download", detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
	<DangerButton
		isBase
		on:click={({ detail }) => {
			dispatch("delete", detail);
		}}
	>
		<TrashIcon />
	</DangerButton>
{:else if state == ChapterDownloadState.NotDownloaded}
	<ButtonAccent
		isBase
		on:click={({ detail }) => {
			dispatch("download", detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
{:else}
	<ButtonAccent isBase>
		<LoadingIcon />
	</ButtonAccent>
{/if}
