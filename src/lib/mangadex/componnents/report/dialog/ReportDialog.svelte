<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { InputMaybe, ReportCategory } from "@mangadex/gql/graphql";
	import { createDialog, melt } from "@melt-ui/svelte";
	import { toStore } from "svelte/store";
	import { XIcon as CloseIcon } from "svelte-feather-icons";
	import { fade } from "svelte/transition";
	import {
		createReportReasonListQuery,
		createSendReportMutation
	} from "@mangadex/gql-docs/report";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	interface Props {
		category: ReportCategory;
		open?: boolean;
		objectId: string;
	}
	let { category, open: propsOpen = $bindable(), objectId }: Props = $props();
	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		portal: "#mangadex-scroll-container",
		open: toStore(
			() => propsOpen ?? false,
			(v) => {
				propsOpen = v;
			}
		)
	});
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

{#if $open}
	<div class="portalled" use:melt={$portalled}>
		<div
			class="overlay"
			use:melt={$overlay}
			transition:fade={{
				duration: 150
			}}
		></div>
		<div
			class="dialog"
			use:melt={$content}
			transition:fade={{
				duration: 150
			}}
		>
			<div class="content">
				<div class="top">
					<div class="title-desc">
						<h2 use:melt={$title}>Report</h2>
					</div>
					<div class="close">
						<ButtonAccent meltElement={close}>
							<CloseIcon />
						</ButtonAccent>
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
					<section>
						<label for="details">Details</label>
						<textarea
							name=""
							id="details"
							disabled={!detailRequired || mutation.isPending}
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
										onSuccess(data, variables, onMutateResult, context) {
											propsOpen = false;
											addToast({
												data: {
													title: "Report sent!"
												}
											});
										},
										onError(error, variables, onMutateResult, context) {
											addErrorToast("cannot send report", error);
										}
									}
								);
							}}
							isBase
							disabled={mutation.isPending}
						>
							<p>Send</p>
						</PrimaryButton>
					</section>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px;
	}
	.portalled {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
	}
	.dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 75vw;
		border: 3px solid var(--primary);
		border-radius: 0.5rem;
		position: fixed;
		z-index: 5;
		transform: translateY(-50%);
		transform: translateX(-50%);
		top: 10vh;
		left: 50%;
		padding: 0.5rem; /* 24px */
		height: 75vh;
	}
	.overlay {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		z-index: 5;
		inset: 0px;
		position: fixed;
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
			h2 {
				margin: 0px;
			}
		}
	}
</style>
