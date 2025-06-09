<script lang="ts">
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import Lists from "./lists/Lists.svelte";
	import { createMutation } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { addToListBatch } from "./lists/query";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	interface Props {
		titles: string[];
	}
	let { titles }: Props = $props();
	let selectedLists: string[] = $state([]);
	const client = getContextClient();
	const mutation = createMutation<
		void,
		Error,
		{
			customListIds: string[];
			titles: string[];
		}
	>({
		mutationKey: ["add", "to", "list", "batch"],
		async mutationFn({ customListIds, titles }) {
			if (customListIds.length == 0 || titles.length == 0) {
				throw new Error("No titles or custom lists selected");
			}
			for (const list in customListIds) {
				const res = await client
					.mutation(addToListBatch, {
						mangas: titles,
						customList: list
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}
	});
</script>

<div class="lists">
	<div class="title">
		<h3>Add to lists</h3>
	</div>

	<Lists bind:selectedLists />

	<div class="bottom">
		<PrimaryButtonOnlyLabel
			label="Add"
			disabled={$mutation.isPending}
			isBase
			onclick={() => {
				$mutation
					.mutateAsync({
						customListIds: selectedLists,
						titles
					})
					.then(() => {
						addToast({
							data: {
								variant: "primary",
								title: "Added titles to custom lists"
							}
						});
					})
					.catch((err) => {
						addErrorToast("Error on adding titles to lists", err);
					});
			}}
		/>
	</div>
</div>

<style lang="scss">
	.bottom {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
	h3 {
		margin: 0px;
	}
	.title {
		display: flex;
	}
	.lists {
		display: grid;
		gap: 12px;
		width: 100%;
		grid-template-rows: 1fr auto 1fr;
		height: 100%;
	}
</style>
