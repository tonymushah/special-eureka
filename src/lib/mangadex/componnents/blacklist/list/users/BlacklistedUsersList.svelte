<script lang="ts">
	import { dev } from "$app/environment";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import { listBlackListedUsersGQLDoc } from "@mangadex/gql-docs/blacklist/users";
	import type { BlacklistUserListParam } from "@mangadex/gql/graphql";
	import { client } from "@mangadex/gql/urql";
	import { createInfiniteQuery } from "@tanstack/svelte-query";

	let params = $state<BlacklistUserListParam>({});
	let query = createInfiniteQuery(() => ({
		queryKey: ["blacklisted", "users", "list", params],
		async queryFn({ pageParam }) {
			const res = await client
				.query(listBlackListedUsersGQLDoc, {
					params: pageParam
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.blacklist.users.list;
			} else {
				throw new Error("no data??");
			}
		},
		initialPageParam: params,
		getNextPageParam(lastPage, _allPages, lastPageParam) {
			const next_offset = lastPage.offset + lastPage.limit;
			if (next_offset > lastPage.total) {
				return null;
			} else {
				return {
					...lastPageParam,
					limit: lastPage.limit,
					offset: next_offset
				};
			}
		}
	}));
	let users = $derived.by(() =>
		new Map(query.data?.pages.flatMap((d) => d.data).map((d) => [d.id as string, d]))
			.values()
			.toArray()
	);
</script>

{#if query.isLoading}
	<div class="center super">
		<Fetching />
	</div>
{:else if query.isSuccess}
	{#if query.data.pages.at(-1)?.total == 0 && !dev}
		<div class="inner-c center">
			<NothingToShow />
		</div>
	{:else}
		<table>
			<thead>
				<tr>
					<th>User Id</th>
					<th>Name</th>
					<th>BlacklistDate</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (`user-${user.id}`)}
					<tr>
						<td>{user.id}</td>
						<td>{user.name}</td>
						<td>{user.insertDate}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if query.isFetching}
			<div class="inner-c center">
				<Fetching />
			</div>
		{:else if query.hasNextPage}
			<div class="inner-c center">
				<HasNext />
			</div>
		{:else}
			<div class="inner-c center">
				<NothingToShow />
			</div>
		{/if}
	{/if}
{:else if query.isError}
	<div class="center super">
		<ErrorComponent
			label="Error on loading blacklisted authors & artists"
			error={query.error}
			retry={() => {
				query.refetch();
			}}
		/>
	</div>
{:else}
	<div class="center super">
		<NothingToShow />
	</div>
{/if}

<style lang="scss">
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.super {
		width: 100%;
		height: 100%;
	}
	table {
		margin-top: 12px;
		width: 100%;
		border-collapse: collapse;
		border: 3px solid var(--contrast-l1);
		thead {
			background-color: var(--accent-l4);
			tr {
				border-radius: 3px;
			}
			th {
				border: 3px solid var(--contrast-l1);
				text-align: center;
				transform: translateY(-3px);
				padding-top: 3px;
			}
		}
		tbody {
			td {
				border-bottom: 3px solid var(--midtone);
			}
		}
	}
	.inner-c {
		width: 100%;
	}
</style>
