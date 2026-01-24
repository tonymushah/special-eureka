<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import { forkCustomListMutation as forkCustomListMutationLoader } from "@mangadex/gql-docs/list/id/fork";
	import { isLogged } from "@mangadex/utils/auth";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { Dialog } from "@ark-ui/svelte/dialog";
	import { Portal } from "@ark-ui/svelte";
	import cssMod from "./custom-list-fork-dialog.module.scss";
	import cssDialogMod from "@mangadex/componnents/theme/dialog/dialog.module.scss";

	interface Props {
		open?: boolean;
		listToFork: string;
		listToForkName?: string;
	}
	let { open = $bindable(), listToFork, listToForkName }: Props = $props();
	let forkCustomListMutation = forkCustomListMutationLoader();
	let name = $state<string>("");
	let visiblity = $state<CustomListVisibility>();
	let filterTitles = $state(true);
</script>

<Dialog.Root bind:open>
	<Portal>
		<Dialog.Backdrop class={cssMod.overlay} />
		<Dialog.Positioner>
			<Dialog.Content class={cssMod.dialog}>
				<div class="content">
					<div class="top">
						<div class="title-desc">
							<Dialog.Title class={cssMod.title}>
								Fork {#if listToForkName}
									{listToForkName}
								{:else}
									{listToFork} MD List
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
						<section>
							MD List id: {listToFork}
						</section>
						<section class="fork-name">
							<label for="fork-name">Name:</label>
							<FormInput
								bind:value={name}
								inputProps={{
									id: "fork-name",
									required: true
								}}
							/>
						</section>
						<section class="visb">
							<h4>
								Visibility: {#if visiblity == undefined}
									<span class="default">(private if not set)</span>
								{/if}
							</h4>
							<div class="vis-input">
								<input
									type="radio"
									value={CustomListVisibility.Public}
									bind:group={visiblity}
									id="vis-public"
								/>
								<label for="vis-public">Public</label>
							</div>
							<div class="vis-input">
								<input
									type="radio"
									value={CustomListVisibility.Private}
									bind:group={visiblity}
									id="vis-private"
								/>
								<label for="vis-private">Private</label>
							</div>
						</section>
						<section class="vis-input">
							<input type="checkbox" bind:checked={filterTitles} />
							<label for="filter-titles">Filter titles </label>
						</section>
						<section class="buttons">
							<PrimaryButton
								onclick={() => {
									if (name.trim().length == 0) {
										addErrorToast("Invalid name input", "Please insert a valid name");
										return;
									}
									forkCustomListMutation.mutate(
										{
											name,
											visibility: visiblity,
											toFork: listToFork,
											filter: filterTitles
										},
										{
											onSuccess(data) {
												addToast({
													title: `Forked ${listToForkName ? listToForkName : `${listToFork} MD List`}`,
													description: `New MD List ID: ${data.id}`
												});
												if (open) {
													goto(
														route("/mangadex/list/[id]", {
															id:
																data.visibility == CustomListVisibility.Private
																	? `private:${data.id}`
																	: data.id
														})
													);
												}
											},
											onError(error) {
												addErrorToast("Cannot fork MD List", error);
											}
										}
									);
								}}
								isBase
								disabled={!$isLogged || forkCustomListMutation.isPending}
							>
								<p class="send">Fork</p>
							</PrimaryButton>
						</section>
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>

<style lang="scss">
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
		grid-template-rows: 0fr 0fr 0fr 0fr 61px;
		height: -webkit-fill-available;
		gap: 12px;
		margin: 0px 12px;
		overflow-y: auto;
		overflow-x: auto;
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
	input {
		width: 24px;
		height: 24px;
	}
	.vis-input {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.fork-name {
		display: grid;
		padding-right: 12px;
	}
	.visb {
		h4 {
			margin: 0px;
			font-weight: 500;
			.default {
				font-style: italic;
			}
		}
	}
</style>
