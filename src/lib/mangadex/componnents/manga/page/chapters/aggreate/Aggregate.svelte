<script lang="ts">
	import ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import getChapterDownloadState from "@mangadex/componnents/home/latest-updates/getChapterDownloadState";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { openUrl as open } from "@tauri-apps/plugin-opener";
	import { getContextClient } from "@urql/svelte";
	import { onDestroy, onMount, type ComponentProps } from "svelte";
	import { derived as der, writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import type { MangaAggregateData, Volume } from "./AggregateContent.svelte";
	import AggregateContent from "./AggregateContent.svelte";
	import { getChapterStoreContext } from "./utils/chapterStores";
	import mangaAggregateQuery, {
		chapterCommentsQuery,
		getMangaAggregateChapterQuery
	} from "./utils/query";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";

	const chaptersStore = getChapterStoreContext();
	const client = getContextClient();
	const __res = getTitleLayoutData();
	const data = __res.queryResult;
	const query = specialQueryStore({
		query: mangaAggregateQuery,
		client,
		variable: {
			id: data!.id
		}
	});
	let threadUrls = $state(new Map<string, string>());
	let unlistens: UnlistenFn[] = [];
	const isFetching = query.isFetching;
	function chapterTitle({
		chapter,
		title
	}: {
		chapter: string | null | undefined;
		title: string | null | undefined;
	}): string | undefined {
		console.log(`${chapter} - ${title}`);
		if (typeof chapter == "string" && typeof title == "string") {
			if (title.length == 0 || title == null) {
				return `Chap. ${chapter}`;
			} else {
				return `Chap. ${chapter} - ${title}`;
			}
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
		const chapters = result.data?.chapter.list.data.map<ComponentProps<typeof ChapterElement1>>(
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
	async function fetchComments(ids: string[]) {
		const res = await client
			.query(chapterCommentsQuery, {
				ids
			})
			.toPromise();
		if (res.error) {
			throw res.error;
		}
		const ret: { id: string; stats: { threadUrl: string; comments: number } }[] = [];
		res.data?.statistics.chapter.list.forEach((d) => {
			const c = d.comments;
			if (c != null || c != undefined) {
				ret.push({
					id: d.id,
					stats: {
						threadUrl: c.threadUrl,
						comments: c.repliesCount
					}
				});
			}
		});
		return ret;
	}
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
					fetchChapters(ids)
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
		await query.execute();
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
			query.execute();
		})
	);
</script>

<div class="aggregate">
	<div class="top">
		<div class="left">
			<ButtonAccent
				onclick={async () => {
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
		<div class="right">
			<ButtonAccent
				onclick={async () => {
					isReversed.update((i) => !i);
				}}
			>
				Reverse
			</ButtonAccent>
		</div>
	</div>
	<div class="content">
		{#if selected}
			{#key selected.id}
				<div transition:fade>
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
</div>

<style lang="scss">
	.aggregate {
		display: flex;
		flex-direction: column;
	}
	.top {
		display: flex;
		justify-content: space-between;
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
</style>
