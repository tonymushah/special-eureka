<script lang="ts">
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/+layout.svelte";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import mangaAggregateQuery, { getMangaAggregateChapterQuery } from "./utils/query";
	import { getContextClient } from "@urql/svelte";
	import { onDestroy, onMount, type ComponentProps } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import chapterStores from "./utils/chapterStores";
	import ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import getChapterDownloadState from "@mangadex/componnents/home/latest-updates/getChapterDownloadState";
	import { derived } from "svelte/store";
	import type { MangaAggregateData, Volume } from "./AggregateContent.svelte";
	import AggregateContent from "./AggregateContent.svelte";
	import lodash from "lodash";

	const chaptersStore = chapterStores();
	const client = getContextClient();
	const { queryResult: data } = getTitleLayoutData();
	const query = specialQueryStore({
		query: mangaAggregateQuery,
		client,
		variable: {
			id: data!.id
		}
	});
	let unlistens: UnlistenFn[] = [];
	const isFetching = query.isFetching;
	function chapterTitle({
		chapter,
		title
	}: {
		chapter: string | null | undefined;
		title: string | null | undefined;
	}): string | undefined {
		if (typeof chapter == "string" && typeof title == "string") {
			return `Chap. ${chapter} - ${title}`;
		} else if (typeof chapter == "string") {
			return `Chap. ${chapter}`;
		} else if (typeof title == "string") {
			return title;
		} else {
			return undefined;
		}
	}
	async function fetchChapters(ids: string[]) {
		const result = await client
			.query(getMangaAggregateChapterQuery, {
				ids
			})
			.toPromise();
		if (result.error) {
			throw result.error;
		}
		const chapters = result.data?.chapter.list.data.map<ComponentProps<ChapterElement1>>(
			(c) => {
				const title = chapterTitle({
					chapter: c.attributes.chapter,
					title: c.attributes.title
				});
				const groups = c.relationships.scanlationGroups.map((group) => ({
					id: group.id,
					name: group.attributes.name
				}));
				const user = c.relationships.user;
				const uploader = {
					id: user.id,
					roles: user.attributes.roles,
					name: user.attributes.username
				};
				return {
					id: c.id,
					title,
					lang: c.attributes.translatedLanguage,
					uploader,
					upload_date: new Date(c.attributes.readableAt),
					download_state: getChapterDownloadState({
						id: c.id,
						client
					}),
					groups
				};
			}
		);
		return chapters;
	}
	const aggregate = derived(query, (q) => {
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
	let isReversed = false;
	let selectedIndex = 0;
	onMount(async () => {
		unlistens.push(
			query.subscribe((e) => {
				e?.data?.manga.aggregate.chunked.forEach((c) => {
					lodash.chunk<string>(c.ids, 100).forEach((ids) => {
						fetchChapters(ids)
							.then((cs) => {
								if (cs) chaptersStore.addByBatch(cs);
							})
							.catch((e) => {
								console.error(e);
							});
					});
				});
			})
		);
		unlistens.push(
			chaptersStore.subscribe((e) => {
				console.debug(e.keys());
			})
		);
		await query.execute();
	});
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	$: selected = $aggregate[selectedIndex];
</script>

<div class="aggregate">
	<div class="top">
		<ButtonAccent
			on:click={async () => {
				if (!$isFetching) {
					await query.execute();
				}
			}}
		>
			{#if $isFetching}
				Loading...
			{:else}
				Refresh
			{/if}
		</ButtonAccent>
	</div>
	<div class="content">
		{#if selected}
			{#key selected.id}
				<AggregateContent {chaptersStore} volumes={selected.chapter} />
			{/key}
		{/if}
	</div>
	<div class="bottom">
		{#each $aggregate as _, i}
			<button
				on:click={() => {
					selectedIndex = i;
				}}
				class:selected={i == selectedIndex}
			>
				{i + 1}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.aggregate {
		display: flex;
		flex-direction: column;
	}
	.bottom {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 10px;
		button {
			background-color: var(--accent);
			padding: 5px 10px;
			font-size: 18px;
			color: var(--textColor);
			font-family: var(--fonts);
			border: none;
			transition:
				background-color 300ms ease-in-out,
				font-weight 300ms ease-in-out;
		}
		button:hover {
			background-color: var(--accent-hover);
		}
		button:active {
			background-color: var(--accent-active);
		}
		button.selected {
			background-color: var(--primary);
			font-weight: 800;
		}
		button.selected:hover {
			background-color: color-mix(in srgb, var(--primary) 90%, transparent 10%);
		}
		button.selected:active {
			background-color: color-mix(in srgb, var(--primary) 80%, transparent 20%);
		}
	}
</style>
