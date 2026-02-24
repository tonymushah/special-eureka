<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { Hammer } from "@lucide/svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import { assembleCustomListsTitlesIntoOneMutation } from "@mangadex/mutations/custom-list/assemble-lists";

	interface Props {
		customLists: string[];
	}
	let { customLists = $bindable([]) }: Props = $props();

	let customListsEmpty = $derived(customLists.length == 0);
	let mutation = assembleCustomListsTitlesIntoOneMutation();
	let newListName = $state("");
	let isPublic = $state(false);
	let filterContent = $state(true);
</script>

<div class="layout">
	<div class="content">
		<h3>Assemble MD Lists into one</h3>
		<div class="option new-name">
			<label for="new-list-name" class="no-wrap">New List Name</label>
			<FormInput
				bind:value={newListName}
				widthFull
				inputProps={{
					id: "new-list-name"
				}}
			/>
		</div>
		<div class="option">
			<input class="checkbox" type="checkbox" bind:checked={isPublic} id="is-public-checkbox" />
			<label for="is-public-checkbox">Make public</label>
		</div>
		<div class="option">
			<input
				class="checkbox"
				type="checkbox"
				bind:checked={filterContent}
				id="filter-content-checkbox"
			/>
			<label for="filter-content-checkbox">Filter contents</label>
		</div>
	</div>
	<div class="actions">
		<PrimaryButtonOnlyLabel
			icon={Hammer}
			disabled={customListsEmpty || mutation.isPending}
			label="Assemble"
			onclick={() => {
				mutation.mutate(
					{
						ids: customLists,
						newListName,
						visibility: isPublic ? CustomListVisibility.Public : CustomListVisibility.Private,
						filterContent
					},
					{
						onError(error) {
							addErrorToast("Cannot assemble lists into one", error);
						},
						onSuccess(res) {
							goto(
								route("/mangadex/list/[id]", {
									id: res.id
								})
							);
						}
					}
				);
			}}
		/>
	</div>
</div>

<style lang="scss">
	.layout {
		display: grid;
		padding-right: 12px;
		h3 {
			margin: 0px;
		}
	}
	.option {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-direction: row;
	}
	.checkbox {
		width: 24px;
		height: 24px;
	}
	.new-name {
		display: grid;
		grid-template-columns: auto 1fr;
	}
	.actions {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
