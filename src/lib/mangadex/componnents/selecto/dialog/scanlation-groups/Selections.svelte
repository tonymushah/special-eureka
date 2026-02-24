<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { createQuery } from "@tanstack/svelte-query";
	import queryGQLDoc from "@mangadex/gql-docs/group/search";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";

	interface Props {
		scanlationGroups?: string[];
	}
	let { scanlationGroups = $bindable([]) }: Props = $props();
	let empty = $derived(scanlationGroups.length == 0);
	let query = createQuery(() => ({
		queryKey: ["selecto", "scanlation-groups", "fetch"],
		async queryFn() {
			return await client
				.query(queryGQLDoc, {
					params: {
						groupIds: scanlationGroups
					}
				})
				.toPromise()
				.then((r) => {
					if (r.error) {
						throw r.error;
					} else if (r.data) {
						return r.data.scanlationGroup.list.data;
					} else {
						throw new Error("no data");
					}
				});
		},
		enabled: !empty,
		staleTime: 0
	}));
	let query_data = $derived.by(() => {
		let data = new Map(
			query.data?.map((d) => [
				d.id as string,
				{
					attributes: d.attributes,
					relationships: d.relationships
				}
			])
		);
		return scanlationGroups
			.map((d) => {
				const aaa = data.get(d);
				if (aaa) {
					return {
						...aaa,
						id: d
					};
				}
			})
			.filter((d) => d != undefined);
	});
	function removeGroupSelection(id: string) {
		scanlationGroups = scanlationGroups.filter((g) => id != g);
	}
</script>

{#snippet emptySnippet()}
	<NothingToShow />
{/snippet}
{#snippet showSelectionsName()}
	{#each query_data as group (`scanlation-group-selection-${group.id}`)}
		{@const leader = group.relationships.leader}
		{@const members = group.relationships.members}
		<button
			class="group as-name"
			onclick={() => {
				removeGroupSelection(group.id);
			}}
		>
			<span class="name">
				{group.attributes.name}
			</span>
			{#if leader}
				<span class="leader">
					Leader: {leader.attributes.username}
				</span>
			{/if}
			<span class="members">
				Members: {members.length}
			</span>
		</button>
	{/each}
{/snippet}
{#snippet showSelectionsIds()}
	{#each scanlationGroups as group_id (`scanlation-group-selection-${group_id}`)}
		<button
			class="group as-id"
			onclick={() => {
				removeGroupSelection(group_id);
			}}
		>
			{group_id}
		</button>
	{/each}
{/snippet}

<section>
	<div class="scanlation-groups" class:empty>
		{#if empty}
			{@render emptySnippet()}
		{:else if query.isSuccess}
			{@render showSelectionsName()}
		{:else}
			{@render showSelectionsIds()}
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		height: 100%;
		overflow-y: scroll;
	}
	.scanlation-groups {
		display: flex;
		/* align-items: center; */
		/* grid-template-columns: repeat(5, 1fr); */
		gap: 6px;
		flex-wrap: wrap;
		width: 100%;
		max-height: 100%;
		flex-direction: column;
	}
	.scanlation-groups.empty {
		align-items: center;
		justify-content: center;
	}
	.group {
		display: flex;
		align-items: center;
		justify-content: start;
		font-family: inherit;
		color: inherit;
		border: none;
		border-radius: 3px;
	}
	.group.as-name {
		background-color: var(--accent-l4);
		display: flex;
		justify-content: space-between;
		.name {
			font-weight: 800;
		}
	}
	.group.as-name:hover {
		background-color: var(--accent-l4-hover);
	}
	.group.as-name:active {
		background-color: var(--accent-l4-active);
	}
	.group.as-id {
		background-color: var(--accent-l2);
	}
	.group.as-id:hover {
		background-color: var(--accent-l2-hover);
	}
	.group.as-id:active {
		background-color: var(--accent-l2-active);
	}
</style>
