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
	interface Events {
		ondownload?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
		ondelete?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
		ondownloading?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}
	interface Props extends Events {}
	let { ondelete, ondownload, ondownloading }: Props = $props();
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
		onclick={(detail) => {
			ondownload?.(detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
	<DangerButton
		isBase
		onclick={(detail) => {
			ondelete?.(detail);
		}}
	>
		<TrashIcon />
	</DangerButton>
{:else if hasFailed}
	<ButtonAccent
		isBase
		onclick={(detail) => {
			ondownload?.(detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
	<DangerButton
		isBase
		onclick={(detail) => {
			ondelete?.(detail);
		}}
	>
		<TrashIcon />
	</DangerButton>
{:else if notDownloaded}
	<ButtonAccent
		isBase
		onclick={(detail) => {
			ondownload?.(detail);
		}}
	>
		<DownloadIcon />
	</ButtonAccent>
{:else}
	<ButtonAccent
		isBase
		onclick={(detail) => {
			ondownloading?.(detail);
		}}
	>
		<LoadingIcon />
	</ButtonAccent>
{/if}
