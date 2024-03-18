<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { CloseIcon } from "@svelteuidev/core";
	import CoverImage from "./dialog/CoverImage.svelte";
	import { getTopMangaTitleContextStore } from "../../context";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { writable } from "svelte/store";
	import type { ReadingStatus } from "@mangadex/gql/graphql";
	import StatusSelect from "./StatusSelect.svelte";
	import type { ReadingStatusEventDetail } from ".";
	import { createEventDispatcher } from "svelte";

	const title = getTopMangaTitleContextStore();
	const dispatch = createEventDispatcher<{
		readingStatus: ReadingStatusEventDetail;
	}>();

	export let status: ReadingStatus | undefined = undefined;
	export let isFollowing: boolean = false;
	export let dialog: HTMLDialogElement | undefined;

	$: selectedStatus = writable<ReadingStatus | undefined>(status);
	$: selectedIsFollowing = writable(isFollowing);
	function closeDialog() {
		if (dialog) {
			dialog.close();
		}
	}
</script>

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
				<div class="form">
					<StatusSelect readingStatus={selectedStatus} />
				</div>
			</div>
			<div class="bottom">
				<ButtonAccent isBase on:click={closeDialog}>
					<div class="buttons">Cancel</div>
				</ButtonAccent>
				<PrimaryButton
					isBase
					on:click={() => {
						closeDialog();
						dispatch("readingStatus", {
							readingStatus: $selectedStatus,
							isFollowing: $selectedIsFollowing
						});
					}}
				>
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
