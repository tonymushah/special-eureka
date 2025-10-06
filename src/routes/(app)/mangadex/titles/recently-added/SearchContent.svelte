<script lang="ts">
	import MangaList from "@mangadex/componnents/manga/list/MangaList.svelte";
	import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { derived, get, type Readable } from "svelte/store";
	import executeSearchQuery from "./execute";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";

	const client = getContextClient();
	const debounce_wait = 450;
	interface Props {
		params: Readable<MangaListParams>;
		refetch?: () => void;
	}

	let { params, refetch = $bindable() }: Props = $props();
	const p_p_offline = derived([params, defaultContentProfile], ([merged]) => [merged]);
	interface InfiniteQueryData {
		data: MangaListContentItemProps[];
		offset: number;
		limit: number;
		total: number;
	}
	const infiniteQueryOptions = derived(p_p_offline, ([$params]) => {
		return {
			queryKey: ["rencently-added-page", $params],
			initialPageParam: [$params],
			getNextPageParam(lastPage, allPages, [lastPageParam], allPageParams) {
				const next_offset = lastPage.limit + lastPage.offset;
				if (next_offset > lastPage.total) {
					return null;
				} else {
					return [
						{
							...lastPageParam,
							limit: lastPage.limit,
							offset: next_offset
						}
					];
				}
			},
			async queryFn({ pageParam: [p] }) {
				const res = await executeSearchQuery(client, p);
				return {
					data: res.data,
					...res.paginationData
				};
			},
			getPreviousPageParam(firstPage, allPages, [firstPageParam], allPageParams) {
				const next_offset = firstPage.limit - firstPage.offset;
				if (next_offset < 0) {
					return null;
				} else {
					return [
						{
							...firstPageParam,
							limit: firstPage.limit,
							offset: next_offset
						}
					];
				}
			}
		} satisfies CreateInfiniteQueryOptions<
			InfiniteQueryData,
			Error,
			InfiniteQueryData,
			[string, MangaListParams],
			[MangaListParams]
		>;
	});
	let infiniteQuery = createInfiniteQuery(() => $infiniteQueryOptions);
	refetch = debounce(() => {
		infiniteQuery.refetch();
	}, debounce_wait);
	let titles = $derived.by(() => {
		const result = infiniteQuery;
		if (result.isLoading) {
			return [];
		}
		return result.data?.pages.map((d) => d.data) ?? [];
	});
	let isFetching = $derived(infiniteQuery.isFetching);
	let hasNext = $derived(infiniteQuery.hasNextPage);
	const fetchNext = debounce(async function () {
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
</script>

<MangaList list={titles}></MangaList>

{#if infiniteQuery.error}
	<ErrorComponent
		label="Error on loading title"
		error={infiniteQuery.error}
		retry={() => infiniteQuery.refetch()}
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
</style>
