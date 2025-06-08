<script lang="ts">
	import SelectionArea from "@viselect/vanilla";
	import { validate } from "uuid";
	import { uniq } from "lodash";
	import { openSelectoDialog } from "./ChapterFeedSelectoDialog.svelte";

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
	$effect(() => {
		if (container && canSelect) {
			const dragselect = new SelectionArea({
				selectables: [".manga-element", ".chapter-element"],
				boundaries: container,
				selectionAreaClass
			})
				.on("start", (ev) => {
					ev.store.stored.forEach((e) => {
						e.removeAttribute("data-selecto-selected");
						selectedChapters = [];
						selectedMangas = [];
					});
				})
				.on("stop", (ev) => {
					ev.store.selected.forEach((element) => {
						const maybeChapterId = element?.getAttribute("data-chapter-id");
						if (maybeChapterId != null) {
							if (validate(maybeChapterId)) selectedChapters.push(maybeChapterId);
						}
						const maybeMangaId = element?.getAttribute("data-manga-id");
						if (maybeMangaId != null) {
							if (validate(maybeMangaId)) selectedMangas.push(maybeMangaId);
						}
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
				dragselect.getSelection().forEach((e) => {
					e.removeAttribute("data-selecto-selected");
				});
				dragselect.destroy();
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		console.log(e.key);
		if (e.key == "Control") {
			canSelect = true;
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
