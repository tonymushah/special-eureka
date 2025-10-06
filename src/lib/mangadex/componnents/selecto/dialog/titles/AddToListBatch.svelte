<script lang="ts">
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { getContextClient } from "@urql/svelte";
	import Lists from "./lists/Lists.svelte";
	import mutation from "./lists/mutation";

	interface Props {
		titles: string[];
	}
	let { titles }: Props = $props();
	let selectedLists: string[] = $state([]);
</script>

<div class="lists">
	<div class="title">
		<h3>Add to lists</h3>
	</div>

	<Lists bind:selectedLists />

	<div class="bottom">
		<PrimaryButtonOnlyLabel
			label="Add"
			disabled={mutation.isPending}
			isBase
			onclick={() => {
				mutation
					.mutateAsync({
						customListIds: new Set(selectedLists).values().toArray(),
						titles: new Set(titles).values().toArray()
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
		display: flex;
		gap: 12px;
		width: 100%;
		height: 100%;
		flex-direction: column;
	}
</style>
