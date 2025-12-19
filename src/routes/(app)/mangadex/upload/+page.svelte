<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import SimpleUploadSession from "@mangadex/componnents/upload/SimpleUploadSession.svelte";
	import SimpleUploadSessionQueueState from "@mangadex/componnents/upload/SimpleUploadSessionQueueState.svelte";
	import { startQueueRunnerMutation } from "@mangadex/gql-docs/upload/mutations/start-queue-runner";
	import { createSwapQueueOrderMutation } from "@mangadex/gql-docs/upload/mutations/swap-queue-order";
	import { queueOrderIDs } from "@mangadex/stores/upload/queue";
	import { sessionsIDs } from "@mangadex/stores/upload/sessions";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { flip } from "svelte/animate";

	let hiSource: "sessions" | "queue" | undefined = $state();
	let hiID: string | undefined = $state();
	let selectedQueue = $state<string | undefined>();
	let swapMutation = createSwapQueueOrderMutation();
	let startRunnerMutation = startQueueRunnerMutation();
</script>

<AppTitle title="Upload Sessions | MangaDex" />

<div class="layout">
	<PageTitle withReturn title="Upload Sessions" />
	<div class="buttons">
		<PrimaryButton
			onclick={() => {
				startRunnerMutation.mutate();
			}}
			disabled={$queueOrderIDs.length == 0 || startRunnerMutation.isPending}
		>
			Start upload!
		</PrimaryButton>
	</div>
	<div class="content">
		<div class="sessions">
			<h2>Sessions</h2>
			<div class="list" class:empty={$sessionsIDs.length == 0}>
				{#each $sessionsIDs as id (id)}
					<SimpleUploadSession
						sessionId={id}
						onmouseenter={() => {
							hiSource = "sessions";
							hiID = id;
						}}
						onmouseleave={() => {
							hiSource = undefined;
							hiID = undefined;
						}}
						highlighted={hiSource != "sessions" && hiID == id}
					/>
				{:else}
					<NothingToShow />
				{/each}
			</div>
		</div>
		<div class="queue">
			<h2>Queue</h2>
			<div class="list" class:empty={$queueOrderIDs.length == 0}>
				{#each $queueOrderIDs as queueId, index (`q-${queueId}`)}
					<div class="list-item" animate:flip>
						<SimpleUploadSessionQueueState
							index={index + 1}
							{queueId}
							selected={queueId == selectedQueue}
							highlighted={hiID == queueId && hiSource != "queue"}
							onmouseenter={() => {
								hiSource = "queue";
								hiID = queueId;
							}}
							disabled={swapMutation.isPending}
							onclick={() => {
								if (selectedQueue == queueId) {
									selectedQueue = undefined;
								} else if (selectedQueue == undefined) {
									selectedQueue = queueId;
								} else {
									swapMutation.mutate(
										{
											a: selectedQueue,
											b: queueId
										},
										{
											onSettled() {
												selectedQueue = undefined;
											},
											onError(error) {
												addErrorToast("Cannot swap queue order", error);
											}
										}
									);
								}
							}}
							onmouseleave={() => {
								hiSource = undefined;
								hiID = undefined;
							}}
						/>
					</div>
				{:else}
					<NothingToShow />
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.layout {
		margin: 0px 1em;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.list.empty {
		align-items: center;
		justify-content: center;
	}
	.content {
		display: grid;
		gap: 14px;
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "lg")) {
		.content {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.list-item {
		display: grid;
	}
</style>
