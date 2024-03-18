<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import getText from "@mangadex/utils/manga/readingStatus/getText";
	import { createEventDispatcher } from "svelte";
	import {
		getTopMangaIsFollowingContextStore,
		getTopMangaReadingStatusContextStore
	} from "../context";
	import type { ReadingStatusEventDetail } from "./readingStatus";
	import Dialog from "./readingStatus/Dialog.svelte";
	import IsFollowingIcon from "./readingStatus/IsFollowingIcon.svelte";

	const readingStatus = getTopMangaReadingStatusContextStore();
	const isFollowingStore = getTopMangaIsFollowingContextStore();
	const dispatch = createEventDispatcher<{
		readingStatus: ReadingStatusEventDetail;
	}>();

	let dialog: HTMLDialogElement | undefined = undefined;
	function openDialog() {
		if (dialog) {
			dialog.showModal();
		}
	}

	$: readingStatusText = getText($readingStatus) ?? "Add to Library";
	$: isFollowing = $isFollowingStore;
</script>

<PrimaryButton
	isBase
	on:click={() => {
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

<Dialog
	bind:status={$readingStatus}
	bind:isFollowing
	bind:dialog
	on:readingStatus={({ detail }) => {
		dispatch("readingStatus", detail);
	}}
/>

<style lang="scss">
	.primary-button {
		width: 10em;
	}
</style>
