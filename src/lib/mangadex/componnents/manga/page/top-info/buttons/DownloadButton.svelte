<script lang="ts">
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { getTopMangaDownloadContextStore } from "../context";
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";
	import TrashIcon from "./download/TrashIcon.svelte";
	import { createEventDispatcher } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import DownloadIcon from "./download/DownloadIcon.svelte";
	import LoadingIcon from "./download/LoadingIcon.svelte";
	import { MangaDownloadState } from "@mangadex/download/manga";

	const stateStore = getTopMangaDownloadContextStore();
	const dispatch = createEventDispatcher<{
		download: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		delete: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		downloading: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();

	let state = $derived($stateStore);
	let isDownloaded = $derived(state == MangaDownloadState.Done);
	let hasFailed = $derived(
		state == MangaDownloadState.Error || state == MangaDownloadState.Canceled
	);
	let notDownloaded = $derived(
		state == MangaDownloadState.Pending || state == MangaDownloadState.OfflineAppStateNotLoaded
	);
</script>

{#if isDownloaded}
	<ButtonAccent
		isBase
		onclick={({ detail }) => {
			dispatch("download", detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
	<DangerButton
		isBase
		onclick={({ detail }) => {
			dispatch("delete", detail);
		}}
	>
		<TrashIcon />
	</DangerButton>
{:else if hasFailed}
	<ButtonAccent
		isBase
		onclick={({ detail }) => {
			dispatch("download", detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
	<DangerButton
		isBase
		onclick={({ detail }) => {
			dispatch("delete", detail);
		}}
	>
		<TrashIcon />
	</DangerButton>
{:else if notDownloaded}
	<ButtonAccent
		isBase
		onclick={({ detail }) => {
			dispatch("download", detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
{:else}
	<ButtonAccent
		isBase
		onclick={({ detail }) => {
			dispatch("downloading", detail);
		}}
	>
		<LoadingIcon />
	</ButtonAccent>
{/if}
