<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { mangadexQueryClient } from "@mangadex/index";
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import { getContextReadChapterMarkers } from "@mangadex/stores/read-markers/context";
	import { isLogged } from "@mangadex/utils/auth";
	import { createQuery } from "@tanstack/svelte-query";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy, onMount } from "svelte";
	import { derived as der, get, writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import type { MangaAggregateData, Volume } from "./AggregateContent.svelte";
	import AggregateContent from "./AggregateContent.svelte";
	import { fetchChapters, fetchComments } from "./utils";
	import { getChapterStoreContext } from "./utils/chapterStores";
	import mangaAggregateQuery from "./utils/query";
	import { readMarkers as readMarkersMutation } from "@mangadex/stores/read-markers/mutations";
	import ChapterFeedSelecto from "@mangadex/componnents/selecto/ChapterFeedSelecto.svelte";
	import { hasConflicts } from "@mangadex/utils/conflicts";

	const chaptersStore = getChapterStoreContext();
	const client = getContextClient();
	const __res = getTitleLayoutData();
	const data = __res.queryResult;
	const query = createQuery({
		queryKey: ["title", __res.layoutData.id, "aggregate"],
		async queryFn() {
			const res = await client.query(mangaAggregateQuery, {
				id: __res.layoutData.id
			});
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data;
			} else {
				throw new Error("no data??");
			}
		},
		networkMode: "always"
	});
	let threadUrls = $state(new Map<string, string>());
	let unlistens: UnlistenFn[] = [];
	const isFetching = der(query, ($q) => $q.isFetching);

	const isEmpty = der(query, (q) => {
		return (q.data?.manga.aggregate.chunked.flatMap((d) => d.ids).length ?? 0) == 0;
	});
	const aggregate = der(query, (q) => {
		const res = q?.data?.manga.aggregate.chunked.map<{
			chapter: MangaAggregateData;
			id: string;
		}>((v, i) => {
			const d = v.volumes.map<Volume>((vo) => {
				return {
					volume: `Volume ${vo.volume}`,
					chapters: vo.chapters.map((chaps) => {
						return {
							chapter: `Chapter ${chaps.chapter}`,
							ids: chaps.ids
						};
					})
				};
			});
			return {
				id: `${data?.id}|${i}`,
				chapter: d
			};
		});
		if (res) {
			return res;
		} else {
			return [];
		}
	});
	const aggregateReverse = der(aggregate, (a) => {
		return a.toReversed().map<{ chapter: MangaAggregateData; id: string }>((vs) => ({
			id: vs.id,
			chapter: vs.chapter.toReversed().map((cs) => ({
				volume: cs.volume,
				chapters: cs.chapters.toReversed()
			}))
		}));
	});
	const isReversed = writable(false);
	let selectedIndex = $state(0);
	onMount(async () => {
		unlistens.push(
			query.subscribe((e) => {
				// [x] Flatten the result data and fetch the data in one go.
				const ids: string[] = e?.data?.manga.aggregate.chunked.flatMap((d) => d.ids) ?? [];
				if (ids.length > 0)
					fetchChapters(ids, !hasConflicts(__res.conflicts))
						.then(async (cs) => {
							if (cs) chaptersStore.addByBatch(cs);
							const comments = await fetchComments(ids);
							comments.forEach((c) => {
								threadUrls.set(c.id, c.stats.threadUrl);
							});
							chaptersStore.setComments(
								comments.map((c) => ({
									id: c.id,
									comments: c.stats.comments
								}))
							);
						})
						.catch((e) => {
							console.error(e);
						});
			})
		);
		unlistens.push(
			chaptersStore.subscribe((e) => {
				console.debug(e.keys());
			})
		);
	});
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	let selected = $derived(
		$isReversed ? $aggregateReverse[selectedIndex] : $aggregate[selectedIndex]
	);
	/// Test if this work
	onMount(() =>
		defaultContentProfile.subscribe(() => {
			get(query).refetch();
		})
	);
	function refetchTitleReadMarker() {
		return mangadexQueryClient.refetchQueries({
			queryKey: ["title", __res.layoutData.id, "read-markers", "page"]
		});
	}
	const readMarkers = getContextReadChapterMarkers();
	const unread = der([query, readMarkers], ([$query, $markers]) => {
		let chapters = new Set(
			$query.data?.manga.aggregate.chunked.flatMap((t) => t.ids as string[])
		);
		let readChapters = new Set(
			$markers
				.entries()
				.filter(([v]) => {
					return v;
				})
				.map(([v, k]) => {
					return k;
				})
		);
		let unreadChapters = chapters.difference(readChapters);

		return unreadChapters;
	});
	const hasUnread = der(unread, ($unread) => $unread.size > 0);
	let selecto_container: HTMLElement | undefined = $state(undefined);
	let selectedMangas: string[] = $state([]);
	let selectedChapters: string[] = $state([]);
</script>

<ChapterFeedSelecto bind:container={selecto_container} bind:selectedMangas bind:selectedChapters />

<div class="aggregate">
	<div class="top">
		<div class="left">
			<ButtonAccent
				disabled={$isFetching}
				onclick={debounce(async () => {
					await $query.refetch();
					await refetchTitleReadMarker();
				})}
			>
				{#if $isFetching}
					Loading...
				{:else}
					Refresh
				{/if}
			</ButtonAccent>
		</div>
		{#if !$isEmpty}
			<div class="right">
				{#if $isLogged}
					<ButtonAccent
						disabled={$query.isLoading || $readMarkersMutation.isPending}
						onclick={() => {
							$readMarkersMutation.mutate(
								{
									reads: $hasUnread ? $unread.values().toArray() : [],
									unreads: $hasUnread
										? []
										: ($query.data?.manga.aggregate.chunked.flatMap(
												(d) => d.ids as string[]
											) ?? [])
								},
								{
									onSuccess() {
										refetchTitleReadMarker();
									}
								}
							);
						}}
					>
						{#if $hasUnread}
							Mark all chapter as read
						{:else}
							Mark all chapter as not read
						{/if}
					</ButtonAccent>
				{/if}
				<ButtonAccent
					onclick={debounce(async () => {
						isReversed.update((i) => !i);
					})}
					disabled={$query.isLoading}
				>
					Reverse
				</ButtonAccent>
			</div>
		{/if}
	</div>
	{#if $query.isFetched}
		{#if $isEmpty}
			<div class="empty">
				<h2>No chapters available</h2>
			</div>
		{:else}
			<div class="content">
				{#if selected}
					{#key selected.id}
						<div transition:fade bind:this={selecto_container}>
							<AggregateContent
								volumes={selected.chapter}
								oncomments={(detail) => {
									console.log(`clicked ${detail.id}`);
									const threadUrl = threadUrls.get(detail.id);
									if (threadUrl) {
										open(threadUrl);
									}
								}}
							/>
						</div>
					{/key}
				{/if}
			</div>
			<div class="bottom">
				{#each $aggregate as _, i}
					<button
						class="selector"
						onclick={() => {
							selectedIndex = i;
						}}
						class:selected={i == selectedIndex}
					>
						{i + 1}
					</button>
				{/each}
			</div>
		{/if}
	{:else if $query.isError}
		<ErrorComponent
			label="Cannot fetch chapter"
			error={$query.error}
			retry={() => {
				$query.refetch().then(() => refetchTitleReadMarker());
			}}
		/>
	{:else if $query.isPending}
		<div class="empty">
			<h2>Pending...</h2>
		</div>
	{:else if $query.isLoading}
		<div class="empty">
			<h2>Loading...</h2>
		</div>
	{/if}
</div>

<style lang="scss">
	.aggregate {
		display: flex;
		flex-direction: column;
	}
	.top {
		display: flex;
		justify-content: space-between;
		padding-bottom: 2px;
	}
	.bottom {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 10px;
		.selector {
			background-color: var(--accent);
			padding: 5px 10px;
			font-size: 18px;
			color: var(--textColor);
			font-family: var(--fonts);
			border: none;
			/**
                BUG Background-color transition with color mix doesn't work proprely on Webkit GTK
            */
			transition:
				//background-color 300ms ease-in-out,
				font-weight 300ms ease-in-out;
		}
		.selector:not(.selected):hover {
			background-color: var(--accent-hover);
		}
		.selector:not(.selected):active {
			background-color: var(--accent-active);
		}
		.selector.selected {
			background-color: var(--primary);
			font-weight: 800;
		}
		.selector.selected:hover {
			background-color: color-mix(in srgb, var(--primary) 90%, transparent 10%);
			//background-color: color-mix(in srgb, var(--primary) 90%, var(--main-background) 10%);
		}
		.selector.selected:active {
			background-color: color-mix(in srgb, var(--primary) 80%, transparent 20%);
		}
	}
	.empty {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200px;
		border: 3px solid var(--mid-tone);
		border-radius: 6px;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 6px;
	}
</style>
