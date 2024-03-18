<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import type { ReadingStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher } from "svelte";
	import {
		getTopMangaIsFollowingContextStore,
		getTopMangaReadingStatusContextStore,
		getTopMangaTitleContextStore
	} from "../context";
	import getText from "@mangadex/utils/manga/readingStatus/getText";
	import IsFollowingIcon from "./readingStatus/IsFollowingIcon.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { CloseIcon } from "@svelteuidev/core";
	import CoverImage from "./readingStatus/CoverImage.svelte";
	import type { ReadingStatusEventDetail } from "./readingStatus";
	import Dialog from "./readingStatus/Dialog.svelte";

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

	$: readingStatusText = getText($readingStatus);
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

<Dialog bind:dialog />

<style lang="scss">
	.primary-button {
		width: 10em;
	}
</style>
