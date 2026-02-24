<script lang="ts">
	import NothingToShow from "@mangadex/componnents/home/NothingToShow.svelte";
	import UserRolesColorProvider from "@mangadex/componnents/user/UserRolesColorProvider.svelte";
	import { getUsersInfoGQLDoc } from "@mangadex/gql-docs/user/get-batch";
	import { client } from "@mangadex/gql/urql";
	import { createQuery } from "@tanstack/svelte-query";

	interface Props {
		users: string[];
	}
	let { users }: Props = $props();

	let empty = $derived(users.length == 0);
	let query = createQuery(() => ({
		queryKey: ["selecto", "users", "fetch"],
		async queryFn() {
			return await client
				.query(getUsersInfoGQLDoc, {
					ids: users
				})
				.toPromise()
				.then((r) => {
					if (r.error) {
						throw r.error;
					} else if (r.data) {
						return r.data.user.list.data;
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
					attributes: d.attributes
				}
			])
		);
		return users
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
	function removeSelection(id: string) {
		users = users.filter((u) => id != u);
	}
</script>

{#snippet emptySnippet()}
	<NothingToShow />
{/snippet}
{#snippet showSelectionsName()}
	{#each query_data as group (`scanlation-group-selection-${group.id}`)}
		<button
			class="user as-name"
			onclick={() => {
				removeSelection(group.id);
			}}
		>
			<UserRolesColorProvider roles={group.attributes.roles}>
				<span class="name">
					{group.attributes.username}
				</span>
			</UserRolesColorProvider>
		</button>
	{/each}
{/snippet}
{#snippet showSelectionsIds()}
	{#each users as group_id (`user-selection-${group_id}`)}
		<button
			class="user as-id"
			onclick={() => {
				removeSelection(group_id);
			}}
		>
			{group_id}
		</button>
	{/each}
{/snippet}

<section>
	<div class="users" class:empty>
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
	.users {
		display: flex;
		/* align-items: center; */
		/* grid-template-columns: repeat(5, 1fr); */
		gap: 6px;
		padding: 6px;
		flex-wrap: wrap;
		width: 100%;
	}
	.users.empty {
		align-items: center;
		justify-content: center;
	}
	.user {
		display: flex;
		align-items: center;
		justify-content: start;
		font-family: inherit;
		color: inherit;
		border: none;
		border-radius: 3px;
	}
	.user.as-name {
		background-color: var(--accent-l4);
		display: flex;
		justify-content: space-between;
		.name {
			font-weight: 800;
		}
	}
	.user.as-name:hover {
		background-color: var(--accent-l4-hover);
	}
	.user.as-name:active {
		background-color: var(--accent-l4-active);
	}
	.user.as-id {
		background-color: var(--accent-l2);
	}
	.user.as-id:hover {
		background-color: var(--accent-l2-hover);
	}
	.user.as-id:active {
		background-color: var(--accent-l2-active);
	}
</style>
