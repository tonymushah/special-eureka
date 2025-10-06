<script lang="ts">
	import IsFollowingButton from "@mangadex/componnents/manga/page/top-info/buttons/readingStatus/dialog/IsFollowingButton.svelte";
	import StatusSelect from "@mangadex/componnents/manga/page/top-info/buttons/readingStatus/dialog/StatusSelect.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { ReadingStatus } from "@mangadex/gql/graphql";
	import { createMutation } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { writable, type Writable } from "svelte/store";
	import {
		followTitlesBatch,
		unfollowTitlesBatch,
		updateReadingStatus
	} from "./update-reading-status/query";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	interface Props {
		titles: string[];
	}
	let { titles }: Props = $props();

	const selectedStatus: Writable<ReadingStatus | undefined> = writable(ReadingStatus.Reading);
	const selectedIsFollowing: Writable<boolean> = writable(true);
	const client = getContextClient();

	let mutation = createMutation<
		[PromiseSettledResult<void>, PromiseSettledResult<void>],
		Error,
		{
			titles: string[];
			status: ReadingStatus | null;
			isFollowing: boolean;
		}
	>(() => ({
		mutationKey: ["update", "reading-status", "following-status", "titles"],
		async mutationFn({ titles, status, isFollowing }) {
			return await Promise.allSettled([
				client
					.mutation(updateReadingStatus, {
						titles,
						status
					})
					.toPromise()
					.then((res) => {
						if (res.error) {
							throw res.error;
						}
					}),
				isFollowing
					? client
							.mutation(followTitlesBatch, {
								titles
							})
							.toPromise()
							.then((res) => {
								if (res.error) {
									throw res.error;
								}
							})
					: client
							.mutation(unfollowTitlesBatch, {
								titles
							})
							.toPromise()
							.then((res) => {
								if (res.error) {
									throw res.error;
								}
							})
			]);
		}
	}));
</script>

<div class="update-reading-status">
	<h3>Update Reading Status</h3>
	<div class="form">
		<StatusSelect readingStatus={selectedStatus} />
		<IsFollowingButton isFollowing={selectedIsFollowing} />
	</div>
	<div class="bottom">
		<PrimaryButtonOnlyLabel
			onclick={() => {
				mutation
					.mutateAsync({
						titles,
						status: $selectedStatus ?? null,
						isFollowing: $selectedIsFollowing
					})
					.then(([status, following]) => {
						switch (status.status) {
							case "fulfilled":
								addToast({
									data: {
										title: "Updated titles statuses",
										variant: "primary"
									}
								});
								break;
							case "rejected":
								addErrorToast("Error on updating titles statuses", status.reason);
								break;
							default:
								break;
						}
						switch (following.status) {
							case "fulfilled":
								addToast({
									data: {
										title: "Updated titles follow statuses",
										variant: "primary"
									}
								});
								break;
							case "rejected":
								addErrorToast(
									"Error on updateing titles following statuses",
									following.reason
								);
								break;
							default:
								break;
						}
					})
					.catch((err) => {
						addErrorToast("Error on updating", err);
					});
			}}
			variant="2"
			label="Set Reading Status"
			disabled={mutation.isPending}
		/>
	</div>
</div>

<style lang="css">
	.form {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
	h3 {
		margin: 0px;
	}
	.update-reading-status {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 80%;
		gap: 8px;
	}
</style>
