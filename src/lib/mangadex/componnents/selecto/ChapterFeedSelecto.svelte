<script lang="ts">
	import DragSelect from "dragselect";
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
			const dragselect = new DragSelect({
				//selectables: [...document.querySelectorAll<HTMLElement>(".manga-element"), ...document.querySelectorAll<HTMLElement>(".chapter-element")],
				area: container
			});
			const mutationObserver = new MutationObserver((v) => {
				for (const mutation of v) {
					if (mutation.type == "childList") {
						dragselect.addSelectables([
							...container.querySelectorAll<HTMLElement>(".manga-element"),
							...container.querySelectorAll<HTMLElement>(".chapter-element")
						]);
					}
				}
			});
			mutationObserver.observe(container);
			dragselect.subscribe("DS:start", (ev) => {
				dragselect.SelectableSet.forEach((e) => {
					e.removeAttribute("data-selecto-selected");
					selectedChapters = [];
					selectedMangas = [];
				});
			});
			dragselect.subscribe("DS:end", (ev) => {
				ev.items.forEach((element) => {});
				ev.items.forEach((element) => {
					const maybeChapterId = element.getAttribute("data-chapter-id");
					if (maybeChapterId != null) {
						if (validate(maybeChapterId)) selectedChapters.push(maybeChapterId);
					}
					const maybeMangaId = element.getAttribute("data-manga-id");
					if (maybeMangaId != null) {
						if (validate(maybeMangaId)) selectedMangas.push(maybeMangaId);
					}
					element.removeAttribute("data-selecto-selected");
				});
				openSelectoDialog({
					titles: selected_mangas,
					chapters: selected_chapters
				});
			});
			dragselect.subscribe("DS:select", (ev) => {
				ev.item.setAttribute("data-selecto-selected", "");
			});
			dragselect.subscribe("DS:unselect", (ev) => {
				ev.item.removeAttribute("data-selecto-selected");
			});
			return () => {
				mutationObserver.disconnect();
				dragselect.SelectedSet.forEach((e) => {
					e.removeAttribute("data-selecto-selected");
				});
				dragselect.stop();
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
