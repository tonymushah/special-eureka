<script lang="ts">
	import "./styles.css";
	import SelectionArea from "@viselect/vanilla";
	import { validate } from "uuid";
	import { uniq } from "lodash";
	import { openSelectoDialog } from "./ChapterFeedSelectoDialog.svelte";
	import { scrollElementId } from "../layout/scrollElement";

	interface Props {
		container: HTMLElement | undefined;
		selectedMangas: string[];
		selectedChapters: string[];
		onEnd?: () => void;
		useDialog?: boolean;
	}
	let {
		container = $bindable(),
		selectedMangas = $bindable(),
		selectedChapters = $bindable(),
		useDialog = true,
		onEnd
	}: Props = $props();
	let canSelect = $state(false);
	let selected_mangas = $derived(uniq(selectedMangas));
	let selected_chapters = $derived(uniq(selectedChapters));
	const selectionAreaClass = "chapter-feed-selecto-area";
	function pushSelected(element: Element) {
		const maybeChapterId = element?.getAttribute("data-chapter-id");
		if (maybeChapterId != null) {
			if (validate(maybeChapterId)) selectedChapters.push(maybeChapterId);
		}
		const maybeMangaId = element?.getAttribute("data-manga-id");
		if (maybeMangaId != null) {
			if (validate(maybeMangaId)) selectedMangas.push(maybeMangaId);
		}
	}
	function cleatSelecteds() {
		selectedChapters = [];
		selectedMangas = [];
	}
	$effect(() => {
		if (container && canSelect) {
			cleatSelecteds();
			container.style.userSelect = "none";
			(() => {
				const mangadexScroll = document.getElementById(scrollElementId);
				if (mangadexScroll) {
					mangadexScroll.style.userSelect = "none";
					mangadexScroll.style.overflowX = "hidden";
					mangadexScroll.setAttribute("data-selecting", "");
				}
			})();
			const dragselect = new SelectionArea({
				selectables: [".manga-element", ".chapter-element"],
				boundaries: [`#${scrollElementId}`],
				selectionAreaClass
			})
				.on("start", (ev) => {
					if (!ev.event?.altKey) {
						ev.selection.clearSelection();
					}
				})
				.on("stop", (ev) => {
					if (!ev.event?.altKey) {
						ev.store.selected.forEach((element) => {
							pushSelected(element);
							element.removeAttribute("data-selecto-selected");
						});
						openSelectoDialog({
							titles: selected_mangas,
							chapters: selected_chapters
						});
						onEnd?.();
					}
				})
				.on("move", (ev) => {
					ev.store.changed.added.forEach((item) =>
						item.setAttribute("data-selecto-selected", "")
					);
					ev.store.changed.removed.forEach((item) =>
						item.removeAttribute("data-selecto-selected")
					);
				});
			return () => {
				dragselect.getSelection().forEach((item) => {
					item.removeAttribute("data-selecto-selected");
				});
				dragselect.clearSelection();

				dragselect.destroy();
				if (container) {
					container.style.userSelect = "auto";
					(() => {
						const mangadexScroll = document.getElementById(scrollElementId);
						if (mangadexScroll) {
							mangadexScroll.style.userSelect = "auto";
							mangadexScroll.style.overflowX = "";
							mangadexScroll.removeAttribute("data-selecting");
						}
					})();
				}
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key == "Control") {
			e.preventDefault();
			canSelect = true;
		} else if (e.key == "a" && canSelect && container) {
			e.preventDefault();
			[".manga-element", ".chapter-element"]
				.map((d) => container.querySelectorAll(d))
				.forEach((d) => {
					d.forEach(pushSelected);
				});
			openSelectoDialog({
				titles: [...selected_mangas],
				chapters: [...selected_chapters]
			});
			onEnd?.();
		}
	}}
	onkeyup={(e) => {
		if (e.key == "Control") {
			canSelect = false;
		}
	}}
/>

<style lang="scss">
</style>
