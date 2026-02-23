<script lang="ts">
	import { dev } from "$app/environment";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import StatusBadgeOnlyLabel from "@mangadex/componnents/theme/tag/StatusBadgeOnlyLabel.svelte";
	import { getCustomListInfoByBatchGQLDoc } from "@mangadex/gql-docs/list/get-batch";
	import type { CustomListVisibility } from "@mangadex/gql/graphql";
	import { client } from "@mangadex/gql/urql";
	import { isLogged } from "@mangadex/utils/auth";
	import { createQuery } from "@tanstack/svelte-query";
	import { upperCase } from "lodash";

	interface Props {
		customLists: string[];
	}
	let { customLists = $bindable([]) }: Props = $props();

	let customListsEmpty = $derived(customLists.length == 0);
	function removeSelection(id: string) {
		customLists = customLists.filter((v) => v != id);
	}
	let customListsQuery = createQuery(() => ({
		queryKey: ["selecto", "custom-lists", "info"],
		staleTime: 0,
		async queryFn() {
			const res = await client
				.query(getCustomListInfoByBatchGQLDoc, {
					ids: customLists,
					private: true
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.customList.getCustomListBatch;
			} else {
				throw new Error("not data???");
			}
		},
		enabled: (!customListsEmpty && $isLogged) || dev
	}));
	let selectedCustomLists = $derived.by(() => {
		const listData = new Map<
			string,
			{
				name: string;
				visibility: CustomListVisibility;
				titles: number;
			}
		>(
			customListsQuery.data?.map((data) => [
				data.id,
				{
					name: data.attributes.name,
					visibility: data.attributes.visibility,
					titles: data.relationships.titlesIds.length
				}
			])
		);
		return customLists
			.map((id) => {
				const data = listData.get(id);
				if (data) {
					return {
						id,
						...data
					};
				}
			})
			.filter((d) => d != undefined);
	});
</script>

<p>Click on the badge to remove the MD list from the selection</p>

{#snippet showIDsOnly()}
	{#each customLists as customlist}
		<button
			class="list as-id"
			onclick={() => {
				removeSelection(customlist);
			}}
		>
			{customlist}
		</button>
	{/each}
{/snippet}

{#snippet showinfos()}
	{#each selectedCustomLists as customlist}
		<button
			class="list as-name"
			onclick={() => {
				removeSelection(customlist.id);
			}}
		>
			<span class="name">
				{customlist.name}
			</span>
			<span>
				{upperCase(customlist.visibility)}
			</span>
			<span>
				{customlist.titles} titles
			</span>
		</button>
	{/each}
{/snippet}

<div class="md-lists-selected" class:empty={customListsEmpty}>
	{#if customListsEmpty}
		<NothingToShow />
	{:else if customListsQuery.isSuccess}
		{@render showinfos()}
	{:else}
		{@render showIDsOnly()}
	{/if}
</div>

<style lang="scss">
	.md-lists-selected {
		display: flex;
		/* align-items: center; */
		/* grid-template-columns: repeat(5, 1fr); */
		gap: 6px;
		height: 100%;
		overflow-y: scroll;
		padding: 6px;
		flex-wrap: wrap;
		flex-direction: column;
		width: 100%;
	}
	.md-lists-selected.empty {
		align-items: center;
		justify-content: center;
	}
	.list {
		display: flex;
		align-items: center;
		justify-content: start;
		font-family: inherit;
		color: inherit;
		border: none;
		border-radius: 3px;
	}
	.list.as-name {
		background-color: var(--accent-l4);
		display: flex;
		justify-content: space-between;
		.name {
			font-weight: 800;
		}
	}
	.list.as-name:hover {
		background-color: var(--accent-l4-hover);
	}
	.list.as-name:active {
		background-color: var(--accent-l4-active);
	}
	.list.as-id {
		background-color: var(--accent-l2);
	}
	.list.as-id:hover {
		background-color: var(--accent-l2-hover);
	}
	.list.as-id:active {
		background-color: var(--accent-l2-active);
	}
	p {
		margin: 4px 0px;
	}
</style>
