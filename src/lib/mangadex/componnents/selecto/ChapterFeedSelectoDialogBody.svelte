<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import MangaDexTabs, { type MangaDexTabTrigger } from "../theme/tabs/MangaDexTabs.svelte";
	import Titles from "./dialog/Titles.svelte";
	import { makeScroll, preventScroll } from "../layout/scrollElement";
	import Chapter from "./dialog/Chapter.svelte";
	import { TabContent } from "@ark-ui/svelte/tabs";
	import cssMod from "./dialog-body.module.scss";

	interface Props {
		titles: string[];
		chapters: string[];
	}
	const titleId = "titles";
	const chapterId = "chapters";
	let { titles = $bindable(), chapters = $bindable() }: Props = $props();
	let triggers = $derived.by(() => {
		return [
			{
				id: titleId,
				title: `Titles (${titles.length})`,
				disabled: titles.length == 0
			},
			{
				id: chapterId,
				title: `Chapters (${chapters.length})`,
				disabled: chapters.length == 0
			}
		] as MangaDexTabTrigger[];
	});
	onMount(() => {
		console.debug("Opening");
		preventScroll();
	});
	onDestroy(() => {
		makeScroll();
		console.debug("Closing");
	});
</script>

<MangaDexTabs {triggers} defaultValue={titleId} content lazyMount unmountOnExit manual>
	<TabContent value={titleId} class={cssMod.content}>
		<Titles {titles} />
	</TabContent>
	<TabContent value={chapterId} class={cssMod.content}>
		<Chapter {chapters} />
	</TabContent>
</MangaDexTabs>
