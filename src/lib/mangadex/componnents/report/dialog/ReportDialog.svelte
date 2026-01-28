<script lang="ts">
	import { ReportCategory, type InputMaybe } from "@mangadex/gql/graphql";
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import { createReportReasonListQuery, createSendReportMutation } from "@mangadex/gql-docs/report";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { Portal } from "@ark-ui/svelte/portal";
	import { Dialog } from "@ark-ui/svelte/dialog";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import cssMod from "./report-dialog.module.scss";
	import cssDialogMod from "@mangadex/componnents/theme/dialog/dialog.module.scss";
	interface Props {
		category: ReportCategory;
		open?: boolean;
		objectId: string;
	}
	let { category, open: propsOpen = $bindable(), objectId }: Props = $props();
	let reasons = $derived(createReportReasonListQuery(category));
	type ReasonState = {
		id: string;
		detailRequired: boolean;
	};
	let reason: InputMaybe<ReasonState> = $state();
	let detailRequired = $derived(reason?.detailRequired ?? false);
	let details: string | undefined = $state();
	let mutation = createSendReportMutation();
</script>

<Dialog.Root bind:open={propsOpen}>
	<Portal>
		<Dialog.Backdrop class={cssMod.overlay} />
		<Dialog.Positioner>
			<MangaDexVarThemeProvider>
				<Dialog.Content class={cssMod.dialog}>
					<div class="content">
						<div class="top">
							<div class="title-desc">
								<Dialog.Title class={cssMod.title}>
									Report {#if category == ReportCategory.Manga}
										Title
									{:else if category == ReportCategory.Chapter}
										Chapter
									{:else if category == ReportCategory.Author}
										Author (or Artist)
									{:else if category == ReportCategory.ScanlationGroup}
										ScanlationGroup
									{:else if category == ReportCategory.User}
										User
									{/if}
								</Dialog.Title>
							</div>
							<div class="close">
								<Dialog.CloseTrigger class={cssDialogMod.closeButton}>
									<CloseIcon class={cssMod.icon} />
								</Dialog.CloseTrigger>
							</div>
						</div>
						<div class="body">
							<p>Object Id: {objectId}</p>
							<section>
								<label for="report-reasons">Reasons: </label>
								<select
									name=""
									id="report-reasons"
									bind:value={reason}
									disabled={!reasons.isSuccess || mutation.isPending}
								>
									<option value={null}>Any</option>
									{#if reasons.isSuccess}
										{#each reasons.data as reason}
											<option
												value={{
													id: reason.id,
													detailRequired: reason.attributes.detailsRequired
												} as ReasonState}
												>{get_value_from_title_and_random_if_undefined(
													reason.attributes.reason,
													"key"
												)}</option
											>
										{/each}
									{/if}
								</select>
							</section>
							<section class="details">
								<label for="details">
									<span class:detailRequired>Details:</span>
									{#if detailRequired}
										(required)
									{/if}
								</label>
								<textarea
									name=""
									id="details"
									disabled={!detailRequired || mutation.isPending}
									required={detailRequired}
									bind:value={details}
								>
								</textarea>
							</section>
							<section class="buttons">
								<PrimaryButton
									onclick={() => {
										mutation.mutate(
											{
												objectId,
												category,
												details,
												reason: reason?.id
											},
											{
												onSuccess() {
													propsOpen = false;
													addToast({
														title: "Report sent!",
														type: "success"
													});
												},
												onError(error) {
													addErrorToast("cannot send report", error);
												}
											}
										);
									}}
									isBase
									disabled={mutation.isPending ||
										reason == undefined ||
										reason == null ||
										(detailRequired && (details?.length ?? 0) == 0)}
								>
									<p class="send">Send</p>
								</PrimaryButton>
							</section>
						</div>
					</div>
					<Dialog.CloseTrigger>
						<CloseIcon />
					</Dialog.CloseTrigger>
				</Dialog.Content>
			</MangaDexVarThemeProvider>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>

<style lang="scss">
	.details {
		display: grid;
		grid-template-rows: 0fr auto;
		height: 100%;
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.send {
		margin: 8px 24px;
		font-weight: 800;
		font-size: 18px;
	}

	.content {
		height: 100%;
		display: flex;
		//grid-template-rows: fit-content auto;
		flex-direction: column;
	}
	.close {
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.top {
		justify-content: space-between;
		display: flex;
		padding: 8px;
		.title-desc {
			display: grid;
		}
	}
	.body {
		display: grid;
		grid-template-rows: 0fr 0fr 1fr 0fr 61px;
		height: -webkit-fill-available;
		gap: 12px;
		margin: 0px 12px;
	}
	span.detailRequired {
		text-decoration: underline;
	}
	textarea {
		transition: background-color 0.25s ease-in-out;
		color: var(--text-color);
		background-color: var(--accent);
		box-shadow: 0px 0px 2px var(--accent);
		font-family: var(--fonts);
		font-size: var(--font-size);
		border-style: solid;
		border-radius: 0.25em;
		padding: 5px;
		border-color: var(--mid-tone);
	}
	textarea:hover {
		background-color: var(--accent-hover);
	}
	textarea:focus {
		background-color: var(--accent-active);
		border-style: dashed;
	}
	textarea:focus-visible {
		//border-style: dashed;
		outline: none;
	}
	textarea:-internal-autofill-selected {
		appearance: none;
		background-color: var(--accent-l1) !important;
		color: var(--text-color) !important;
	}
</style>
