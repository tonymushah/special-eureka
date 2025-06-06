<script lang="ts">
	import Selecto from "selecto";
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
	$effect(() => {
		if (container && canSelect) {
			const selecto = new Selecto({
				container,
				selectableTargets: [".manga-element", ".chapter-element"],
				toggleContinueSelect: "alt",
				preventDefault: true,
				preventRightClick: true,
				preventClickEventOnDrag: true,
				preventClickEventOnDragStart: true,
				hitRate: 50,
				innerScrollOptions: {
					container: "#mangadex-scroll-container"
				}
			});
			selecto
				.on("dragStart", () => {
					selecto
						.findSelectableTargets()
						.forEach((e) => e.removeAttribute("data-selecto-selected"));
					selectedChapters = [];
					selectedMangas = [];
				})
				.on("select", (ev) => {
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
					openSelectoDialog({
						titles: selected_mangas,
						chapters: selected_chapters
					});
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
