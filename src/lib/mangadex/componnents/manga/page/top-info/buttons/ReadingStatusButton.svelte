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

	const readingStatus = getTopMangaReadingStatusContextStore();
	const isFollowingStore = getTopMangaIsFollowingContextStore();
	const title = getTopMangaTitleContextStore();
	const dispatch = createEventDispatcher<{
		readingStatus: ReadingStatusEventDetail;
	}>();

	let dialog: HTMLDialogElement | undefined = undefined;
	function openDialog() {
		if (dialog) {
			dialog.showModal();
		}
	}
	function closeDialog() {
		if (dialog) {
			dialog.close();
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

<dialog bind:this={dialog}>
	<div class="title">
		<p>Add to Library</p>
		<ButtonAccent on:click={closeDialog}>
			<CloseIcon />
		</ButtonAccent>
	</div>
	<div class="body">
		<div class="cover">
			<CoverImage />
		</div>
		<div class="content">
			<div class="top">
				<h3>{title}</h3>
				<h4>Reading Status</h4>
				<div></div>
			</div>
			<div class="bottom">
				<ButtonAccent isBase on:click={closeDialog}>
					<div class="buttons">Cancel</div>
				</ButtonAccent>
				<PrimaryButton isBase>
					<div class="buttons">Add</div>
				</PrimaryButton>
			</div>
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 75vw;
		border: none;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.title {
		p {
			margin: 0px;
		}
		justify-content: space-between;
		display: flex;
	}
	.primary-button {
		width: 10em;
	}
	.body {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		.cover {
			grid-column: 0 / 4;
			grid-row: 1;
			display: flex;
			align-self: center;
			justify-content: center;
			margin: 1em;
		}
		.content {
			grid-column: 2 / -1;
			grid-row: 1;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.bottom {
				display: flex;
				gap: 10px;
				justify-content: end;
				.buttons {
					width: 9em;
				}
			}
		}
	}
</style>
