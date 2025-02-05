<script lang="ts">
	import { getContextClient } from "@urql/svelte";
	import { debounce, type DebouncedFunc } from "lodash";
	import { onDestroy, onMount } from "svelte";
	import type { Readable } from "svelte/store";
	import { derived, writable } from "svelte/store";
	import executeSearchQuery, { type UserCustomListItemData } from "./search";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import ChapterFeedList from "@mangadex/componnents/chapter/feed/list/ChapterFeedList.svelte";
	import chapterFeedStyle from "@mangadex/stores/chapterFeedStyle";
	import type { UserCustomListParams } from "@mangadex/gql/graphql";
	import { route } from "$lib/ROUTES";
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import { goto } from "$app/navigation";

	interface Props {
		userId: Readable<string>;
	}

	let { userId }: Props = $props();
	let isFetching = $state(false);
	const client = getContextClient();
	const lists = writable<UserCustomListItemData[]>([]);
	const debounce_wait = 450;
	const params = derived([userId], ([$userId]) => {
		return {
			userId: $userId
		} satisfies UserCustomListParams;
	});
	let debounce_func: DebouncedFunc<() => Promise<void>> | undefined = undefined;
	const currentResult = writable<AbstractSearchResult<UserCustomListItemData> | undefined>(
		undefined
	);
	onMount(() =>
		params.subscribe(($params) => {
			debounce_func?.flush();
			currentResult.set(undefined);

			debounce_func = debounce(async () => {
				isFetching = true;
				try {
					const res = await executeSearchQuery(client, $params);
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
				lists.update((ts) => {
					ts.push(...inner.data);
					return ts;
				});
			} else {
				lists.set([]);
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
			threshold: 0.2
		}
	);
	onDestroy(() => {
		debounce_func?.cancel();
		observer.disconnect();
	});
	let to_obserce_bind: HTMLElement | undefined = $state(undefined);
	$effect(() => {
		if (to_obserce_bind) {
			observer.unobserve(to_obserce_bind);
			observer.observe(to_obserce_bind);
		}
	});
	$effect(() => {
		console.log(`isFetching: ${isFetching}`);
	});
	const hasNext = derived(currentResult, ($currentResult) => $currentResult?.hasNext());
</script>

<div class="result">
	{#each $lists as list}
		<UsersSimpleBase
			name={list.name}
			on:click={() => {
				goto(
					route("/mangadex/list/[id]", {
						id: list.id
					})
				);
			}}
		>
			<p class="titles-number">
				{list.titles}
				{#if list.titles > 1}
					titles
				{:else}
					title
				{/if}
			</p>
		</UsersSimpleBase>
	{/each}
</div>

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
