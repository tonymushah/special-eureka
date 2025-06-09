<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { createMutation } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { makeEmptyListMutation } from "@mangadex/componnents/manga/add-to-list/query";

	interface Props {
		onMakeSuccess?: () => void;
	}
	let { onMakeSuccess }: Props = $props();
	let custom_list_name: string | undefined = $state();
	let isPrivate = $state(true);
	function resetForm() {
		custom_list_name = undefined;
		isPrivate = true;
	}
	const client = getContextClient();
	const mutation = createMutation<
		string,
		Error,
		{
			isPrivate: boolean;
			name: string;
		},
		string
	>({
		mutationKey: ["custom", "list", "create"],
		async mutationFn({ isPrivate, name }) {
			const res = await client
				.mutation(makeEmptyListMutation, {
					visibility: isPrivate
						? CustomListVisibility.Private
						: CustomListVisibility.Public,
					name
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.customList.create.id;
			} else {
				throw new Error("no data??");
			}
		}
	});
</script>

<div class="make-list">
	<div class="input">
		<FormInput
			bind:value={custom_list_name}
			inputProps={{
				type: "text",
				placeholder: "Make a new customList",
				disabled: $mutation.isPending
			}}
			widthFull
		/>
	</div>

	{#if isPrivate}
		<ButtonAccentOnlyLabel
			disabled={$mutation.isPending}
			label="Private"
			type="button"
			onclick={() => {
				isPrivate = !isPrivate;
			}}
		/>
	{:else}
		<DangerButtonOnlyLabel
			disabled={$mutation.isPending}
			label="Public"
			type="button"
			onclick={() => {
				isPrivate = !isPrivate;
			}}
		/>
	{/if}
	<PrimaryButtonOnlyLabel
		label="Create"
		disabled={$mutation.isPending}
		onclick={() => {
			if (custom_list_name) {
				$mutation
					.mutateAsync({
						isPrivate,
						name: custom_list_name
					})
					.then(() => {
						resetForm();
						addToast({
							data: {
								title: "CustomList created successfully",
								variant: "green"
							}
						});
						onMakeSuccess?.();
					})
					.catch((e) => {
						addErrorToast("Error on creating customList", e);
					});
			}
		}}
	/>
</div>

<style lang="scss">
	.make-list {
		display: flex;
		flex-direction: row;
		gap: 6px;
		align-items: center;
		justify-content: center;
	}
	.input {
		display: flex;
		flex-grow: 1;
	}
</style>
