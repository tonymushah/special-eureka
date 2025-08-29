<script lang="ts">
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { AuthorListParams } from "@mangadex/gql/graphql";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { derived, get, type Readable } from "svelte/store";
	import executeSearchQuery, { type AuthorListItemData } from "./search";

	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import pageLimit from "@mangadex/stores/page-limit";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";

	const client = getContextClient();
	interface Props {
		authorName: Readable<string | undefined>;
	}

	let { authorName }: Props = $props();
	const params = derived([authorName, pageLimit], ([$authorName, $limit]) => {
		return {
			name: $authorName,
			limit: $limit
		} satisfies AuthorListParams;
	});
	interface InfiniteQueryData {
		data: AuthorListItemData[];
		offset: number;
		limit: number;
		total: number;
	}
	const infiniteQuery = createInfiniteQuery(
		derived(params, ($params) => {
			return {
				queryKey: ["author-search", $params],
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
				[string, AuthorListParams],
				AuthorListParams
			>;
		})
	);
	const authors = derived(infiniteQuery, (result) => {
		if (result.isLoading) {
			return [];
		}
		return Array.from(
			new Set(result.data?.pages.map((d) => d.data).flatMap((i) => i) ?? []).values()
		);
	});
	const isFetching = derived(infiniteQuery, (result) => result.isFetching);
	const hasNext = derived(infiniteQuery, (result) => result.hasNextPage);
	const fetchNext = debounce(async function () {
		const inf = get(infiniteQuery);
		return await inf.fetchNextPage();
	});
	const observer = new IntersectionObserver(
		(entries) => {
			if (!$isFetching && $hasNext) {
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
</script>

<div class="result">
	{#each $authors as author}
		<UsersSimpleBase
			name={author.name}
			onclick={() => {
				goto(
					route("/mangadex/author/[id]", {
						id: author.id
					})
				);
			}}
			profilePicture={author.profilePicture}
		>
			<p class="titles-number">
				{author.titles}
				{#if author.titles > 1}
					titles
				{:else}
					title
				{/if}
			</p>
		</UsersSimpleBase>
	{/each}
</div>

{#if $infiniteQuery.error}
	<ErrorComponent
		label="Error on loading title"
		error={$infiniteQuery.error}
		retry={() => {
			$infiniteQuery.refetch();
		}}
	/>
{/if}

<div class="observer-trigger" bind:this={to_obserce_bind}>
	{#if $isFetching}
		<Fetching />
	{:else if $hasNext}
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
	.titles-number {
		margin: 0px;
	}
</style>
