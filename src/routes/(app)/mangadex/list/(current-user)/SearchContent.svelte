<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import { CustomListVisibility, type CurrentLoggedLists } from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	import customListElementContextMenu from "@mangadex/utils/context-menu/list";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { flip } from "svelte/animate";
	import { crossfade } from "svelte/transition";
	import executeSearchQuery, { type CurrentUserCustomListItemData } from "./search";

	const client = getContextClient();
	let query = createInfiniteQuery(() => {
		return {
			queryKey: ["user", "current", "custom-lists", `limit:${$pageLimit}`],
			async queryFn({ pageParam }) {
				return await executeSearchQuery(client, pageParam);
			},
			getNextPageParam(lastPage, _allPages, lastPageParam) {
				let limit = lastPage.paginationData.limit;
				let next_offset = limit + lastPage.paginationData.offset;
				if (next_offset > lastPage.paginationData.total) {
					return null;
				} else {
					return {
						...lastPageParam,
						offset: next_offset,
						limit
					};
				}
			},
			initialPageParam: {
				limit: $pageLimit
			} satisfies CurrentLoggedLists
		} satisfies CreateInfiniteQueryOptions<
			AbstractSearchResult<CurrentUserCustomListItemData>,
			Error,
			AbstractSearchResult<CurrentUserCustomListItemData>,
			readonly string[],
			CurrentLoggedLists
		>;
	});
	let hasNext = $derived(query.hasNextPage);
	let isFetching = $derived(query.isLoading);
	let lists = $derived(new Set(query.data?.pages.flatMap((e) => e.data)) ?? new Set());
	const debounce_wait = 450;
	const fetchNext = debounce(() => {
		return query.fetchNextPage();
	}, debounce_wait);

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
			threshold: 0.2
		}
	);
	onDestroy(() => {
		observer.disconnect();
	});
	let to_obserce_bind: HTMLElement | undefined = $state(undefined);
	$effect(() => {
		if (to_obserce_bind) {
			observer.unobserve(to_obserce_bind);
			observer.observe(to_obserce_bind);
		}
	});
	const [send, receive] = crossfade({});
</script>

<div class="result">
	{#each lists as list (list.id)}
		{@const isPrivate = list.visibility == CustomListVisibility.Private}
		{@const isPublic = list.visibility == CustomListVisibility.Public}
		<span
			animate:flip
			in:receive={{
				key: list.id
			}}
			out:send={{
				key: list.id
			}}
		>
			<UsersSimpleBase
				name={list.name}
				onclick={() => {
					goto(
						route("/mangadex/list/[id]", {
							id:
								list.visibility == CustomListVisibility.Private
									? `private:${list.id}`
									: list.id
						})
					);
				}}
				oncontextmenu={registerContextMenuEvent({
					includeContext: false,
					stopPropagation: true,
					preventDefault: true,
					additionalMenus() {
						return customListElementContextMenu({
							id: list.id,
							name: list.name,
							isMine: true,
							onVisibilityChange() {
								query.refetch();
							}
						});
					}
				})}
			>
				<div class="child">
					<p class:isPrivate class:isPublic class="visibility">
						{list.visibility == CustomListVisibility.Public ? "Public" : "Private"}
					</p>
					<p class="titles-number">
						{list.titles}
						{#if list.titles > 1}
							titles
						{:else}
							title
						{/if}
					</p>
				</div>
			</UsersSimpleBase>
		</span>
	{/each}
</div>

{#if query.error}
	<ErrorComponent
		label="Error on fetching"
		error={query.error}
		retry={() => {
			query.refetch();
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
	.child {
		display: flex;
		align-items: center;
		gap: 3px;
	}
	.result {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
	}
	.titles-number {
		margin: 0px;
	}
	.visibility.isPublic {
		color: var(--status-green);
	}
	.visibility.isPrivate {
		color: var(--status-red);
	}
</style>
