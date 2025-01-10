<script lang="ts">
	import { writable } from "svelte/store";
	import { initCurrentChapterData, type CurrentChapterData } from "../../contexts/currentChapter";
	import ChapterPageHeader from "../ChapterPageHeader.svelte";

	interface Props {
		currentChapter: CurrentChapterData;
	}

	let { currentChapter = $bindable() }: Props = $props();
	const c = writable(currentChapter);
	initCurrentChapterData(c);
	$effect(() => {
		c.set(currentChapter);
	});
</script>

<ChapterPageHeader />
