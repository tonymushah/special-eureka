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
	import { uniq } from "lodash";

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
	let selectedMangas: string[] = $state([]);
	let selectedChapters: string[] = $state([]);
	let selected_mangas = $derived(uniq(selectedMangas));
	let selected_chapters = $derived(uniq(selectedChapters));
	let dialog: HTMLDialogElement | undefined = $state(undefined);
	function openDialog() {
		if (dialog) {
			dialog.showModal();
		}
	}
	let isShiftDown = $state(false);
	$effect(() => {
		if (container && isShiftDown) {
			const selecto = new Selecto({
				container,
				selectableTargets: [".manga-element", ".chapter-element"],
				toggleContinueSelect: "alt",
				preventDefault: true,
				preventRightClick: true,
				preventClickEventOnDrag: true,
				preventClickEventOnDragStart: true
			});
			selecto
				.on("dragStart", () => {
					selectedChapters = [];
					selectedMangas = [];
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
							if (validate(maybeChapterId)) selectedChapters.push(maybeChapterId);
						}
						const maybeMangaId = element.getAttribute("data-manga-id");
						if (maybeMangaId != null) {
							if (validate(maybeMangaId)) selectedMangas.push(maybeMangaId);
						}
					});
					openDialog();
				});

			return () => {
				selecto
					.findSelectableTargets()
					.forEach((e) => e.removeAttribute("data-selecto-selected"));
				selecto.destroy();
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key == "Shift") {
			isShiftDown = true;
		}
	}}
	onkeyup={(e) => {
		if (e.key == "Shift") {
			isShiftDown = false;
		}
	}}
/>

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
