<script lang="ts">
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import {
		followUserBatchMutation,
		unfollowUserBatchMutation
	} from "@mangadex/mutations/user/follow-batch";
	import SectionBase from "./SectionBase.svelte";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import { dev } from "$app/environment";
	import Selections from "./users/Selections.svelte";
	interface Props {
		users: string[];
	}
	let { users }: Props = $props();
	let exportIdsToTxt = exportIdsToTxtLoader();
	let usersEmpty = $derived(users.length == 0);
	let currentAction = $state<"selection">("selection");
	let unfollow = unfollowUserBatchMutation();
	let follow = followUserBatchMutation();
</script>

<SectionBase>
	{#snippet content()}
		{#if currentAction == "selection"}
			<Selections {users} />
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
			disabled={exportIdsToTxt.isPending || usersEmpty}
			label="Export ids as txt"
			onclick={() => {
				exportIdsToTxt.mutateAsync(
					{
						uuids: users
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
			disabled={usersEmpty || follow.isPending}
			label="Follow"
			onclick={() => {
				follow.mutate(users, {
					onError(error) {
						addErrorToast("Cannot change users following status", error);
					},
					onSuccess() {
						addToast({
							title: "Changed users following status",
							type: "success"
						});
					}
				});
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={usersEmpty || unfollow.isPending}
			label="Unfollow"
			onclick={() => {
				unfollow.mutate(users, {
					onError(error) {
						addErrorToast("Cannot change users unfollowing status", error);
					},
					onSuccess() {
						addToast({
							title: "Changed users unfollowing status",
							type: "success"
						});
					}
				});
			}}
		/>
		{#if dev}
			<ButtonAccentOnlyLabel variant="3" disabled label="Block" />
			<ButtonAccentOnlyLabel variant="3" disabled label="Unblock" />
		{/if}
	{/snippet}
</SectionBase>
