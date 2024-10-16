<script lang="ts">
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { AuthorListParams } from "@mangadex/gql/graphql";
	import { getContextClient } from "@urql/svelte";
	import { debounce, type DebouncedFunc } from "lodash";
	import { onDestroy, onMount } from "svelte";
	import { derived, writable, type Readable } from "svelte/store";
	import executeSearchQuery, { type AuthorListItemData } from "./search";

	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";

	let isFetching = false;
	const client = getContextClient();
	const authors = writable<AuthorListItemData[]>([]);
	const debounce_wait = 450;
	export let authorName: Readable<string | undefined>;
	const params = derived([authorName], ([$authorName]) => {
		return {
			name: $authorName
		} satisfies AuthorListParams;
	});
	let debounce_func: DebouncedFunc<() => Promise<void>> | undefined = undefined;
	const currentResult = writable<AbstractSearchResult<AuthorListItemData> | undefined>(undefined);
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
				authors.update((ts) => {
					ts.push(...inner.data);
					return ts;
				});
			} else {
				authors.set([]);
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

<div class="result">
	{#each $authors as author}
		<UsersSimpleBase
			name={author.name}
			on:click={() => {
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
