<script lang="ts">
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { ScanlationGroupListParams } from "@mangadex/gql/graphql";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { derived, get, type Readable } from "svelte/store";
	import executeSearchQuery, { type ScanlationGroupListItemData } from "./search";

	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import pageLimit from "@mangadex/stores/page-limit";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import scanlationGroupElementContextMenu from "@mangadex/utils/context-menu/scanlationGroup";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";

	const client = getContextClient();

	const debounce_wait = 450;
	interface Props {
		groupName: Readable<string | undefined>;
	}

	let { groupName }: Props = $props();
	const params = derived([groupName, pageLimit], ([$groupName, $limit]) => {
		return {
			name: $groupName,
			limit: $limit
		} satisfies ScanlationGroupListParams;
	});
	interface InfiniteQueryData {
		data: ScanlationGroupListItemData[];
		offset: number;
		limit: number;
		total: number;
	}
	let infiniteQuery = createInfiniteQuery(() => {
		return {
			queryKey: ["scanalation-group-search", $params],
			initialPageParam: $params,
			getNextPageParam(lastPage, allPages, lastPageParam, allPageParams) {
				const next_offset = lastPage.limit + lastPage.offset;
				if (next_offset > lastPage.total) {
					return null;
				} else {
					return {
						...lastPageParam,
						limit: lastPage.limit,
						offset: next_offset
					};
				}
			},
			async queryFn({ pageParam }) {
				const res = await executeSearchQuery(client, pageParam);
				return {
					data: res.data,
					...res.paginationData
				};
			},
			getPreviousPageParam(firstPage, allPages, firstPageParam, allPageParams) {
				const next_offset = firstPage.limit - firstPage.offset;
				if (next_offset < 0) {
					return null;
				} else {
					return {
						...firstPageParam,
						limit: firstPage.limit,
						offset: next_offset
					};
				}
			}
		} satisfies CreateInfiniteQueryOptions<
			InfiniteQueryData,
			Error,
			InfiniteQueryData,
			[string, ScanlationGroupListParams],
			ScanlationGroupListParams
		>;
	});
	let scanGroups = $derived.by(() => {
		const result = infiniteQuery;
		if (result.isLoading) {
			return [];
		}
		return Array.from(
			new Set(result.data?.pages.map((d) => d.data).flatMap((i) => i) ?? []).values()
		);
	});
	let isFetching = $derived(infiniteQuery.isFetching);
	let hasNext = $derived(infiniteQuery.hasNextPage);
	let fetchNext = debounce(async function () {
		const inf = infiniteQuery;
		return await inf.fetchNextPage();
	});
	const observer = new IntersectionObserver(
		(entries) => {
			if (!isFetching && hasNext) {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						fetchNext();
					}
				});
			}
		},
		{
			threshold: 1.0
		}
	);
	let to_obserce_bind: HTMLElement | undefined = $state(undefined);
	$effect(() => {
		if (to_obserce_bind) {
			observer.observe(to_obserce_bind);
			return () => {
				if (to_obserce_bind) observer.unobserve(to_obserce_bind);
			};
		}
	});
	onDestroy(() => {
		observer.disconnect();
	});
	const [send, receive] = crossfade({});
</script>

<div class="result">
	{#each scanGroups as group (group.id)}
		<span
			animate:flip
			in:receive={{
				key: group.id
			}}
			out:send={{
				key: group.id
			}}
		>
			<UsersSimpleBase
				name={group.name}
				onclick={() => {
					goto(
						route("/mangadex/group/[id]", {
							id: group.id
						})
					);
				}}
				oncontextmenu={registerContextMenuEvent({
					preventDefault: true,
					includeContext: false,
					stopPropagation: true,
					additionalMenus() {
						return scanlationGroupElementContextMenu({
							id: group.id,
							name: group.name,
							leader: group.leader,
							website: group.website,
							discord: group.discord
						});
					}
				})}
			>
				<p class="group-members">
					{group.members}
					{#if group.members > 1}
						members
					{:else}
						member
					{/if}
				</p>
			</UsersSimpleBase>
		</span>
	{/each}
</div>

{#if infiniteQuery.error}
	<ErrorComponent
		label="Error on loading title"
		error={infiniteQuery.error}
		retry={() => {
			infiniteQuery.refetch();
		}}
	/>
{/if}

<div class="observer-trigger" bind:this={to_obserce_bind}>
	{#if isFetching}
		<Fetching />
	{:else if hasNext}
		<HasNext />
	{:else}
		<NothingToShow />
	{/if}
</div>

<style lang="scss">
	.observer-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.result {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
	}
	.group-members {
		margin: 0px;
	}
</style>
