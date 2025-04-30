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

	const readingStatus = getTopMangaReadingStatusContextStore();
	const isFollowingStore = getTopMangaIsFollowingContextStore();
	interface Events {
		onreadingStatus?: (ev: ReadingStatusEventDetail) => any;
	}
	interface Props extends Events {
		closeDialogOnAdd?: boolean;
	}

	let { onreadingStatus, closeDialogOnAdd }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state(undefined);
	function openDialog() {
		if (dialog) {
			dialog.showModal();
		}
	}

	let readingStatusText = $derived(getText($readingStatus) ?? "Add to Library");
	let isFollowing = $derived($isFollowingStore);
</script>

<PrimaryButton
	isBase
	onclick={() => {
		openDialog();
	}}
>
	<div class="primary-button">
		{#if isFollowing}
			<IsFollowingIcon />
		{/if}
		{readingStatusText}
	</div>
</PrimaryButton>

<Dialog status={$readingStatus} {isFollowing} bind:dialog {onreadingStatus} {closeDialogOnAdd} />

<style lang="scss">
	.primary-button {
		width: 10em;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
</style>
