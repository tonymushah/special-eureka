<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import MangaList from "@mangadex/componnents/manga/list/MangaList.svelte";
	import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
	import SortSelector from "@mangadex/componnents/manga/list/sortSelector/SortSelector.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { MangaListParams, MangaSortOrder } from "@mangadex/gql/graphql";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce /* , last, range */ } from "lodash";
	import { onDestroy } from "svelte";
	import executeSearchQuery from "./search";
	import { listenToBlacklistChange } from "@mangadex/utils/blacklist/listen";

	const client = getContextClient();
	interface Props {
		params: MangaListParams;
		offlineStore: boolean;
		excludeContentProfile?: boolean;
		hideReadTitle?: boolean;
		disableAuthorArtitsBlacklist?: boolean;
	}

	let {
		params: _initialParam,
		offlineStore,
		excludeContentProfile,
		hideReadTitle = $bindable(false),
		disableAuthorArtitsBlacklist
	}: Props = $props();
	let initialParam = $derived(structuredClone(_initialParam));
	interface InfiniteQueryData {
		data: MangaListContentItemProps[];
		offset: number;
		limit: number;
		total: number;
	}
	let infiniteQuery = createInfiniteQuery(() => {
		let params = initialParam;
		let isOffline = offlineStore;
		return {
			queryKey: [
				"manga-search",
				params,
				isOffline,
				hideReadTitle,
				disableAuthorArtitsBlacklist ?? false
			],
			initialPageParam: [
				{ ...params },
				isOffline,
				hideReadTitle,
				disableAuthorArtitsBlacklist ?? false
			],
			getNextPageParam(
				lastPage,
				allPages,
				[lastPageParam, lastPageOffline, lastHideReadTitle, disableAuthorArtistsBlacklist]
			) {
				const next_offset = lastPage.limit + lastPage.offset;
				if (next_offset > lastPage.total) {
					return null;
				} else {
					return [
						{
							...lastPageParam,
							limit: lastPage.limit,
							offset: next_offset
						},
						lastPageOffline,
						lastHideReadTitle,
						disableAuthorArtistsBlacklist
					];
				}
			},
			async queryFn({ pageParam: [p, offline, hideReadTitle, disableAuthorArtistsBlacklist] }) {
				const res = await executeSearchQuery(
					client,
					p,
					offline,
					excludeContentProfile,
					hideReadTitle,
					disableAuthorArtistsBlacklist
				);
				return {
					data: res.data,
					...res.paginationData
				};
			},
			getPreviousPageParam(
				firstPage,
				allPages,
				[firstPageParam, firstPageOffline, firstHideReadTitle, disableAuthorArtistsBlacklist]
			) {
				const next_offset = firstPage.limit - firstPage.offset;
				if (next_offset < 0) {
					return null;
				} else {
					return [
						{
							...firstPageParam,
							limit: firstPage.limit,
							offset: next_offset
						},
						firstPageOffline,
						firstHideReadTitle,
						disableAuthorArtistsBlacklist
					];
				}
			}
		} satisfies CreateInfiniteQueryOptions<
			InfiniteQueryData,
			Error,
			InfiniteQueryData,
			[string, MangaListParams, boolean, boolean, boolean],
			[MangaListParams, boolean, boolean, boolean]
		>;
	});
	let titles = $derived.by(() => {
		const result = infiniteQuery;
		if (result.isLoading) {
			return [];
		}
		return result.data?.pages.map((d) => d.data) ?? [];
	});
	$effect(() =>
		listenToBlacklistChange(() => {
			infiniteQuery.refetch();
		})
	);
	let isFetching = $derived(infiniteQuery.isFetching);
	let hasNext = $derived(infiniteQuery.hasNextPage);
	/// TODO implement this
	/*let pages = $derived.by(() => {
		const initalPage = infiniteQuery.data?.pages[0];
		if (initalPage) {
			return Math.floor(initalPage.total / initalPage.limit);
		}
	}); 
	let currentPage = $derived.by(() => {
		const result = infiniteQuery;
		const current = last(result.data?.pages);
		const initalPage = result.data?.pages[0];
		if (current && initalPage) {
			return range(initalPage.offset, current.total, initalPage.limit).findIndex(
				(step) => step <= current.offset
			);
		}
	});
	*/
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

<MangaList list={titles}>
	{#snippet additionalContent()}
		<div class="additional-content">
			<section>
				<p>Sort by:</p>
				<SortSelector
					bind:sort={
						() => initialParam.order ?? undefined,
						(val) => {
							initialParam.order = val;
						}
					}
				/>
			</section>
		</div>
	{/snippet}
</MangaList>

{#if infiniteQuery.error}
	<ErrorComponent
		label="Error on loading titles"
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
	.additional-content {
		display: flex;
		align-items: center;
		section {
			display: flex;
			align-items: center;
			gap: 10px;
			p {
				margin: 0px;
			}
		}
	}
</style>
