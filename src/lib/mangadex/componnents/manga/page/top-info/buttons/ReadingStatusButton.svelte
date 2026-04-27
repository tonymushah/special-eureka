<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import getText from "@mangadex/utils/manga/readingStatus/getText";
	import {
		getTopMangaIsFollowingContextStore,
		getTopMangaReadingStatusContextStore
	} from "../context";
	import type { ReadingStatusEventDetail } from "./readingStatus";
	import Dialog from "./readingStatus/Dialog.svelte";
	import IsFollowingIcon from "./readingStatus/IsFollowingIcon.svelte";
	import Added from "./readingStatus/Added.svelte";

	const readingStatusCtx = getTopMangaReadingStatusContextStore();
	const isFollowingStore = getTopMangaIsFollowingContextStore();
	interface Events {
		onreadingStatus?: (ev: ReadingStatusEventDetail) => any;
	}
	interface Props extends Events {
		closeDialogOnAdd?: boolean;
		disabled?: boolean;
	}

	let { onreadingStatus, closeDialogOnAdd, disabled }: Props = $props();
	let readingStatus = $derived(readingStatusCtx.value ?? undefined);
	let dialog: HTMLDialogElement | undefined = $state(undefined);
	function openDialog() {
		if (dialog) {
			dialog.showModal();
		}
	}
	let isFollowing = $derived(isFollowingStore.value ?? undefined);
	let readingStatusText = $derived(
		getText(readingStatus ?? undefined) ?? (isFollowing ? "Followed" : "Add to Library")
	);
</script>

<PrimaryButton
	isBase
	onclick={() => {
		openDialog();
	}}
	{disabled}
>
	<div class="primary-button">
		{#if isFollowing}
			<IsFollowingIcon />
		{:else if readingStatus}
			<Added />
		{/if}
		{readingStatusText}
	</div>
</PrimaryButton>

<Dialog
	{disabled}
	status={readingStatus}
	{isFollowing}
	bind:dialog
	{onreadingStatus}
	{closeDialogOnAdd}
/>

<style lang="scss">
	.primary-button {
		width: 10em;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
</style>
