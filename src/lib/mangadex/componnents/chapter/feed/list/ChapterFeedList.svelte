<script lang="ts">
	/*
	 TODO implement selecto
	 */
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { ChapterFeedStyle } from "@mangadex/gql/graphql";
	import { type Writable } from "svelte/store";
	import type { ChapterFeedListItem } from ".";
	import ChapterFeedElement2 from "../element2/ChapterFeedElement2.svelte";
	import ChapterFeedElement3 from "../element3/ChapterFeedElement3.svelte";
	import ChapterFeedListSelector from "./select/ChapterFeedListSelector.svelte";
	import Selecto from "selecto";
	import { validate } from "uuid";
	import ChapterFeedSelectoDialog from "@mangadex/componnents/selecto/ChapterFeedSelectoDialog.svelte";

	interface Props {
		list?: ChapterFeedListItem[];
		style: Writable<ChapterFeedStyle>;
		children?: import("svelte").Snippet;
	}

	let { list = [], style, children }: Props = $props();
	let coverfull = $derived($style == ChapterFeedStyle.CoverFull);
	let coverless = $derived($style == ChapterFeedStyle.CoverLess);
	let isEmpty = $derived(list.length == 0);
	let container: HTMLElement | undefined = $state();
	let selectedMangas: Set<string> = $state(new Set());
	let selectedChapters: Set<string> = $state(new Set());
	let selected_mangas = $derived(Array.from(selectedMangas.values()));
	let selected_chapters = $derived(Array.from(selectedChapters.values()));
	let dialog: HTMLDialogElement | undefined = $state(undefined);
	function openDialog() {
		if (dialog) {
			dialog.showModal();
		}
	}
	$effect(() => {
		if (container) {
			const selecto = new Selecto({
				container,
				selectableTargets: ["manga-element", "chapter-element"],
				toggleContinueSelect: "shift"
			});
			selecto
				.on("dragStart", () => {
					selectedChapters.clear();
					selectedMangas.clear();
				})
				.on("selectStart", (ev) => {
					ev.added.forEach((element) => {
						element.setAttribute("data-selecto-selected", "");
					});
					ev.removed.forEach((element) => {
						element.removeAttribute("data-selecto-selected");
					});
				})
				.on("selectEnd", (ev) => {
					ev.afterAdded.forEach((element) => {
						element.setAttribute("data-selecto-selected", "");
					});
					ev.afterRemoved.forEach((element) => {
						element.removeAttribute("data-selecto-selected");
					});
					ev.selected.forEach((element) => {
						const maybeChapterId = element.getAttribute("data-chapter-id");
						if (maybeChapterId != null) {
							if (validate(maybeChapterId)) {
								selectedChapters.add(maybeChapterId);
							}
						}
						const maybeMangaId = element.getAttribute("data-manga-id");
						if (maybeMangaId != null) {
							if (validate(maybeMangaId)) {
								selectedChapters.add(maybeMangaId);
							}
						}
					});
					openDialog();
				});

			return () => {
				selecto.destroy();
			};
		}
	});
</script>

<ChapterFeedSelectoDialog
	bind:dialog
	selectedChapters={selected_chapters}
	selectedMangas={selected_mangas}
/>

<section>
	<div class="tab-title">
		<div class="tab-additional-content">
			{#if children}{@render children()}{:else}
				<span>:3</span>
			{/if}
		</div>
		<ChapterFeedListSelector {style} />
	</div>
	<MidToneLine />
	<section class="content" bind:this={container} class:coverfull class:coverless class:isEmpty>
		{#each list as item}
			{#if coverfull}
				<ChapterFeedElement2
					title={item.title}
					chapters={item.chapters}
					coverImage={item.coverImage}
					coverImageAlt={item.coverImageAlt}
					mangaLang={item.mangaLang}
					mangaId={item.mangaId}
					on:download
					on:downloadKeyPress
					on:mangaClick
					on:mangaClick
					on:mangaKeyPress
					on:read
					on:readKeyPress
				/>
			{:else if coverless}
				<ChapterFeedElement3
					title={item.title}
					chapters={item.chapters}
					mangaLang={item.mangaLang}
					mangaId={item.mangaId}
					on:download
					on:downloadKeyPress
					on:mangaClick
					on:mangaClick
					on:mangaKeyPress
					on:read
					on:readKeyPress
				/>
			{/if}
		{/each}
	</section>
</section>

<style lang="scss">
	div.tab-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.content {
		display: grid;
		gap: 10px;
	}
	section {
		--chapter-layout: var(--accent-l3);
		--chapter-layout-hover: var(--accent-l3-hover);
		--chapter-layout-active: var(--accent-l3-active);
	}
</style>
