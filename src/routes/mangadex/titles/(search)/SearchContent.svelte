<script lang="ts">
	import MangaList from "@mangadex/componnents/manga/list/MangaList.svelte";
	import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
	import type { MangaListParams } from "@mangadex/gql/graphql";
	import { getContextClient } from "@urql/svelte";
	import { debounce, type DebouncedFunc } from "lodash";
	import { onDestroy, onMount } from "svelte";
	import { derived, get, writable, type Readable } from "svelte/store";
	import executeSearchQuery from "./search";
	import Fetching from "./content/Fetching.svelte";
	import HasNext from "./content/HasNext.svelte";
	import NothingToShow from "./content/NothingToShow.svelte";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	let isFetching = false;
	const client = getContextClient();
	const titles = writable<MangaListContentItemProps[]>([]);
	const debounce_wait = 450;
	export let params: Readable<MangaListParams>;
	export let offlineStore: Readable<boolean>;
	const p_p_offline = derived([params, offlineStore], (merged) => merged);
	let debounce_func: DebouncedFunc<() => Promise<void>> | undefined = undefined;
	const currentResult = writable<AbstractSearchResult<MangaListContentItemProps> | undefined>(
		undefined
	);
	onMount(() =>
		p_p_offline.subscribe(([p, offline]) => {
			debounce_func?.flush();
			currentResult.set(undefined);

			debounce_func = debounce(async () => {
				isFetching = true;
				try {
					const res = await executeSearchQuery(client, p, offline);
					currentResult.set(res);
				} finally {
					isFetching = false;
				}
			}, debounce_wait);
			debounce_func();
		})
	);
	onMount(() =>
		currentResult.subscribe((inner) => {
			console.log("changed current result", inner);
			if (inner) {
				titles.update((ts) => {
					ts.push(...inner.data);
					return ts;
				});
			} else {
				titles.set([]);
			}
		})
	);
	const observer = new IntersectionObserver(
		(entries) => {
			if (!isFetching && $currentResult?.hasNext()) {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						debounce_func?.flush();
						console.log("should fetch next");
						debounce_func = debounce(async () => {
							isFetching = true;
							try {
								const res = await $currentResult.next();
								currentResult.set(res);
							} finally {
								isFetching = false;
							}
						}, debounce_wait);
						debounce_func();
					}
				});
			}
		},
		{
			threshold: 1.0
		}
	);
	onDestroy(() => {
		debounce_func?.cancel();
		observer.disconnect();
	});
	let to_obserce_bind: HTMLElement | undefined = undefined;
	$: {
		if (to_obserce_bind) {
			observer.unobserve(to_obserce_bind);
			observer.observe(to_obserce_bind);
		}
	}
	$: console.log(`isFetching: ${isFetching}`);
	const hasNext = derived(currentResult, ($currentResult) => $currentResult?.hasNext());
</script>

<MangaList list={$titles}></MangaList>

<div class="observer-trigger" bind:this={to_obserce_bind}>
	{#if isFetching}
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
</style>
