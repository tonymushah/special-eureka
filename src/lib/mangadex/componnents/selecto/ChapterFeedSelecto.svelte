<script lang="ts">
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
					// mangadexScroll.style.overflow = "auto";
				}
			})();
			const dragselect = new SelectionArea({
				selectables: [".manga-element", ".chapter-element"],
				boundaries: (() => {
					const bound: HTMLElement[] = [container];
					const mangadexScroll = document.getElementById(scrollElementId);
					if (mangadexScroll) {
						bound.push(mangadexScroll);
					}
					return bound;
				})(),
				selectionAreaClass
			})
				.on("start", (ev) => {
					ev.selection.clearSelection();
				})
				.on("stop", (ev) => {
					ev.store.selected.forEach((element) => {
						pushSelected(element);
						element.removeAttribute("data-selecto-selected");
					});
					openSelectoDialog({
						titles: selected_mangas,
						chapters: selected_chapters
					});
					onEnd?.();
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
							//mangadexScroll.style.overflow = "initial";
						}
					})();
				}
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		console.log(e.key);
		if (e.key == "Control") {
			canSelect = true;
		} else if (e.key == "a" && canSelect && container) {
			console.log("select all");
			[".manga-element", ".chapter-element"]
				.map((d) => container.querySelectorAll(d))
				.forEach((d) => {
					d.forEach(pushSelected);
				});
			openSelectoDialog({
				titles: selected_mangas,
				chapters: selected_chapters
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
	:global(.chapter-feed-selecto-area) {
		background: rgba(108, 115, 255, 0.5);
		border: 1px solid rgb(62, 99, 221);
		border-radius: 0.15em;
	}
</style>
