<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import Selections from "./scanlation-groups/Selections.svelte";
	import {
		followScanlationGroupBatchMutation,
		unfollowScanlationGroupBatchMutation
	} from "@mangadex/mutations/group/follow-batch";
	import { dev } from "$app/environment";
	import { createBlockScanlationGroupBatchMutation } from "@mangadex/mutations/blacklist/scanlation-groups/block";
	import { createUnblockScanlationGroupBatchMutation } from "@mangadex/mutations/blacklist/scanlation-groups/unblock";

	interface Props {
		scanlationGroups?: string[];
	}

	let { scanlationGroups = $bindable([]) }: Props = $props();
	let exportIdsToTxt = exportIdsToTxtLoader();
	let scanlationGroupsEmpty = $derived(scanlationGroups.length == 0);
	let currentAction = $state<"selection">("selection");
	let unfollow = unfollowScanlationGroupBatchMutation();
	let follow = followScanlationGroupBatchMutation();
	let block = createBlockScanlationGroupBatchMutation();
	let unblock = createUnblockScanlationGroupBatchMutation();
</script>

<SectionBase>
	{#snippet content()}
		{#if currentAction == "selection"}
			<Selections bind:scanlationGroups />
		{/if}
	{/snippet}
	{#snippet actions()}
		<ButtonAccentOnlyLabel
			label="Change Selections"
			variant={currentAction == "selection" ? "5" : "3"}
			onclick={() => {
				currentAction = "selection";
			}}
			disabled={currentAction == "selection"}
		/>

		<ButtonAccentOnlyLabel
			variant="3"
			disabled={exportIdsToTxt.isPending || scanlationGroupsEmpty}
			label="Export ids as txt"
			onclick={() => {
				exportIdsToTxt.mutateAsync(
					{
						uuids: scanlationGroups
					},
					{
						onError(error) {
							addErrorToast("Cannot export cover ids as txt", error);
						},
						onSuccess(data) {
							revealItemInDir(data);
						}
					}
				);
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={scanlationGroupsEmpty || follow.isPending}
			label="Follow"
			onclick={() => {
				follow.mutate(scanlationGroups, {
					onError(error) {
						addErrorToast("Cannot change scanlation groups following status", error);
					},
					onSuccess() {
						addToast({
							title: "Changed scanlation groups following status",
							type: "success"
						});
					}
				});
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={scanlationGroupsEmpty || unfollow.isPending}
			label="Unfollow"
			onclick={() => {
				unfollow.mutate(scanlationGroups, {
					onError(error) {
						addErrorToast("Cannot change scanlation groups unfollowing status", error);
					},
					onSuccess() {
						addToast({
							title: "Changed scanlation groups unfollowing status",
							type: "success"
						});
					}
				});
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			label="Block"
			disabled={block.isPending || unblock.isPending}
			onclick={() => {
				block.mutate(scanlationGroups, {
					onSuccess() {
						addToast({
							title: `Successfully added ${scanlationGroups.length} scanlation groups to blacklist`,
							type: "success"
						});
					},
					onError(e) {
						addErrorToast("Error on changing blocking status", e);
					}
				});
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={unblock.isPending || block.isPending}
			label="Unblock"
			onclick={() => {
				unblock.mutate(scanlationGroups, {
					onSuccess() {
						addToast({
							title: `Successfully removed ${scanlationGroups.length} scanlation groups to blacklist`,
							type: "warning"
						});
					},
					onError(e) {
						addErrorToast("Error on changing blocking status", e);
					}
				});
			}}
		/>
	{/snippet}
</SectionBase>
