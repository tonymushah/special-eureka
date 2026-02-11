<!--
	BUG: i dunno if it is because of the logic sometime the drag select doesn't works
-->
<script lang="ts" module>
	const canSelect = writable(false);

	export const canSelect_ = readonly(canSelect);
	const selectables = [
		".manga-element",
		".chapter-element",
		".users-simple-selectable",
		".cover-art-element"
	];
</script>

<script lang="ts">
	import cssMod from "./ChapterFeedSelecto.module.scss";
	import SelectionArea from "@viselect/vanilla";
	import { validate } from "uuid";
	import { uniq } from "lodash";
	import { openSelectoDialog } from "./ChapterFeedSelectoDialog.svelte";
	import { scrollElementId } from "../layout/scrollElement";
	import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
	import { onDestroy, onMount } from "svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { readonly, writable } from "svelte/store";

	interface Props {
		container: HTMLElement | undefined;
		selectedMangas?: string[];
		selectedChapters?: string[];
		onEnd?: (ev?: MouseEvent | TouchEvent) => void;
		useDialog?: boolean;
		selectedCustomLists?: string[];
		selectedScansGroups?: string[];
		selectedUsers?: string[];
		selectedCovers?: string[];
	}
	let {
		container = $bindable(),
		selectedMangas = $bindable([]),
		selectedChapters = $bindable([]),
		selectedCustomLists = $bindable([]),
		selectedCovers = $bindable([]),
		selectedScansGroups = $bindable([]),
		selectedUsers = $bindable([]),
		useDialog = true,
		onEnd
	}: Props = $props();
	let selected_mangas = $derived(uniq(selectedMangas));
	let selected_chapters = $derived(uniq(selectedChapters));
	let selected_custom_lists = $derived(uniq(selectedCustomLists));
	let selected_covers = $derived(uniq(selectedCovers));
	let selected_scans_groups = $derived(uniq(selectedScansGroups));
	let selected_users = $derived(uniq(selectedUsers));

	const selectionAreaClass = cssMod.selectoArea;
	function pushSelected(element: Element) {
		const maybeChapterId = element?.getAttribute("data-chapter-id");
		if (maybeChapterId != null) {
			if (validate(maybeChapterId)) selectedChapters.push(maybeChapterId);
		}

		const maybeMangaId = element?.getAttribute("data-manga-id");
		if (maybeMangaId != null) {
			if (validate(maybeMangaId)) selectedMangas.push(maybeMangaId);
		}

		const maybeCustomListId = element?.getAttribute("data-custom-list-id");
		if (maybeCustomListId != null) {
			if (validate(maybeCustomListId)) selectedCustomLists.push(maybeCustomListId);
		}

		const maybeCoverId = element?.getAttribute("data-cover-id");
		if (maybeCoverId != null) {
			if (validate(maybeCoverId)) selectedCovers.push(maybeCoverId);
		}

		const maybeScansGroupId = element?.getAttribute("data-scanlation-group-id");
		if (maybeScansGroupId != null) {
			if (validate(maybeScansGroupId)) selectedScansGroups.push(maybeScansGroupId);
		}

		const maybeUserId = element?.getAttribute("data-user-id");
		if (maybeUserId != null) {
			if (validate(maybeUserId)) selectedUsers.push(maybeUserId);
		}
	}
	function cleatSelecteds() {
		selectedChapters = [];
		selectedMangas = [];
	}
	$effect(() => {
		if (container && $canSelect) {
			cleatSelecteds();
			container.style.userSelect = "none";
			(() => {
				const mangadexScroll = document.getElementById(scrollElementId);
				if (mangadexScroll) {
					mangadexScroll.style.userSelect = "none";
					mangadexScroll.style.overflow = "scroll";
					mangadexScroll.setAttribute("data-selecting", "");
				}
			})();
			const dragselect = new SelectionArea({
				selectables,
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
						if (useDialog) {
							openSelectoDialog({
								titles: [...selected_mangas],
								chapters: [...selected_chapters],
								covers: [...selected_covers],
								scanGroups: [...selected_scans_groups],
								users: [...selected_users],
								customLists: [...selected_custom_lists]
							});
						}
						onEnd?.(ev.event ?? undefined);
					}
				})
				.on("move", (ev) => {
					ev.store.changed.added.forEach((item) => item.setAttribute("data-selecto-selected", ""));
					ev.store.changed.removed.forEach((item) => item.removeAttribute("data-selecto-selected"));
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
							mangadexScroll.style.overflow = "";
							mangadexScroll.removeAttribute("data-selecting");
						}
					})();
				}
			};
		}
	});
	const currentWindow = getCurrentWebviewWindow();
	let unlistens: UnlistenFn[] = [];
	onMount(async () => {
		const unlisten = await currentWindow.onFocusChanged(({ payload: isFocused }) => {
			if (isFocused == false) {
				$canSelect = false;
			}
		});
		unlistens.push(unlisten);
	});
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key == "Control") {
			e.preventDefault();
			$canSelect = true;
		} else if (e.key == "a" && $canSelect && container) {
			e.preventDefault();
			selectables
				.map((d) => container.querySelectorAll(d))
				.forEach((d) => {
					d.forEach(pushSelected);
				});
			if (useDialog) {
				openSelectoDialog({
					titles: [...selected_mangas],
					chapters: [...selected_chapters],
					covers: [...selected_covers],
					scanGroups: [...selected_scans_groups],
					users: [...selected_users],
					customLists: [...selected_custom_lists]
				});
			}

			onEnd?.();
		}
	}}
	onkeyup={(e) => {
		if (e.key == "Control") {
			$canSelect = false;
		}
	}}
	onfocusout={() => {
		$canSelect = false;
	}}
/>
