<script lang="ts" module>
	import type { Chapter } from "@mangadex/componnents/chapter/feed";
	import ChapterFeedElement1 from "@mangadex/componnents/chapter/feed/element1/ChapterFeedElement1.svelte";
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { debounce } from "lodash";
	import { derived as der, writable } from "svelte/store";
	import chapterStores from "../page/chapters/aggreate/utils/chapterStores";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import getMangaToReadChapter from "./getMangaToReadChapter";
	import { fetchComments } from "../page/chapters/aggreate/utils";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";

	const currentMangaId = writable<string | null>(null);
	export const readManga = debounce(function (id: string) {
		currentMangaId.set(id);
	});
	function unsetManga() {
		currentMangaId.set(null);
	}
</script>

<script lang="ts">
	let dialog: HTMLDialogElement | undefined = $state();
	$effect(() => {
		if ($currentMangaId != undefined || $currentMangaId != null) {
			dialog?.showModal();
		}
	});
	const chapter_store = chapterStores();
	let threadUrls = $state(new Map<string, string>());
	const query = createQuery(
		der(currentMangaId, (manga_id) => {
			return {
				queryKey: manga_id ? ["manga", manga_id, "read"] : ["manga", "noop", "read"],
				async queryFn() {
					if (!manga_id) {
						throw new Error("no manga id");
					} else {
						return await getMangaToReadChapter(manga_id);
					}
				}
			} satisfies CreateQueryOptions<Chapter[]>;
		})
	);
	$effect(() =>
		query.subscribe(
			(res) => {
				if (res.data) {
					if (res.data.length == 1) {
						readChapter(res.data[0].chapterId);
					}
					chapter_store.addByBatch(
						res.data.map((d) => ({
							id: d.chapterId,
							...d
						}))
					);
					fetchComments(res.data.map((d) => d.chapterId)).then((coms) => {
						coms.forEach((e) => {
							threadUrls.set(e.id, e.stats.threadUrl);
						});
						chapter_store.setComments(
							coms.map((com) => ({
								id: com.id,
								comments: com.stats.comments
							}))
						);
					});
				}
			},
			() => {
				chapter_store.clear();
				threadUrls.clear();
			}
		)
	);
	function readChapter(id: string) {
		dialog?.close();
		unsetManga();
		chapter_store.clear();
		goto(route(`/mangadex/chapter/[id]`, { id }));
	}
	let chapters = $derived(Array.from($chapter_store.values()));
</script>

<dialog bind:this={dialog}>
	<div class="container">
		{#if $query.isFetching}
			<Fetching />
		{:else if $query.error}
			<ErrorComponent error={$query.error} label="Error on finding the first chapters" />
		{:else}
			<div>
				<h1>Select a chapter to read</h1>
				<div class="chapters">
					{#each chapters as chapter (chapter.id)}
						<ChapterElement1
							{...chapter}
							oncomments={({ id }) => {
								const url = threadUrls.get(id);
								if (url) openUrl(url);
							}}
							onclick={() => {
								readChapter(chapter.id);
							}}
						/>
					{/each}
				</div>
			</div>
		{/if}
		<div class="bottom">
			<ButtonAccentOnlyLabel
				label="Close"
				onclick={() => {
					dialog?.close();
					unsetManga();
				}}
			/>
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 50vw;
		height: 65vh;
		border: 2px solid var(--primary);
		border-radius: 3px;
		padding: 12px;
		z-index: 30;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
	.bottom {
		display: flex;
		align-items: end;
		justify-content: center;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.chapters {
		display: grid;
		overflow-y: scroll;
	}
</style>
