<script lang="ts">
	import { writable } from "svelte/store";
	import { initCurrentChapterData, type CurrentChapterData } from "../../contexts/currentChapter";
	import ChapterPageHeader from "../ChapterPageHeader.svelte";

	export let currentChapter: CurrentChapterData;
	const c = writable(currentChapter);
	initCurrentChapterData(c);
	$: c.set(currentChapter);
</script>

<ChapterPageHeader />
