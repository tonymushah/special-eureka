<script lang="ts">
	import { run } from 'svelte/legacy';

	import { writable } from "svelte/store";
	import { initCurrentChapterData, type CurrentChapterData } from "../../contexts/currentChapter";
	import ChapterPageHeader from "../ChapterPageHeader.svelte";

	interface Props {
		currentChapter: CurrentChapterData;
	}

	let { currentChapter }: Props = $props();
	const c = writable(currentChapter);
	initCurrentChapterData(c);
	run(() => {
		c.set(currentChapter);
	});
</script>

<ChapterPageHeader />
