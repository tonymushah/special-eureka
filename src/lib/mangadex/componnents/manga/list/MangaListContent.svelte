<script lang="ts" module>
	import type { CoverMangaListItemProps } from "./cover/CoverMangaList.svelte";
	import type { LongMangaListItemProps } from "./long/LongMangaList.svelte";
	import type { MediumMangaListElementProps } from "./medium/MediumMangaList.svelte";

	export type MangaListContentItemProps = LongMangaListItemProps &
		CoverMangaListItemProps &
		MediumMangaListElementProps;
</script>

<script lang="ts">
	import { MangaListStyle } from "@mangadex/gql/graphql";
	import { getMangaListStyleContext } from "./contexts/style";
	import CoverMangaList from "./cover/CoverMangaList.svelte";
	import LongMangaList from "./long/LongMangaList.svelte";
	import MediumMangaList from "./medium/MediumMangaList.svelte";
	import Selecto from "selecto";
	import { validate } from "uuid";
	import ChapterFeedSelectoDialog from "@mangadex/componnents/selecto/ChapterFeedSelectoDialog.svelte";

	interface Props {
		list?: MangaListContentItemProps[];
	}

	let { list }: Props = $props();
	const style = getMangaListStyleContext();
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

<div class="manga-list-content" bind:this={container}>
	{#if $style == MangaListStyle.Grid}
		<MediumMangaList {list} />
	{:else if $style == MangaListStyle.Rows}
		<LongMangaList {list} />
	{:else if $style == MangaListStyle.Cover}
		<CoverMangaList {list} />
	{/if}
</div>
