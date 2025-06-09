<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import MangaDexTabs, { type MangaDexTabTrigger } from "../theme/tabs/MangaDexTabs.svelte";
	import Titles from "./dialog/Titles.svelte";
	import { makeScroll, preventScroll } from "../layout/scrollElement";

	interface Props {
		titles: string[];
		chapters: string[];
	}
	const titleId = "titles";
	const chapterId = "chapters";
	let { titles, chapters }: Props = $props();
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
		preventScroll();
	});
	onDestroy(() => {
		makeScroll();
	});
</script>

<div class="body">
	<MangaDexTabs bind:triggers>
		{#snippet children(key)}
			{#if key == titleId}
				<Titles {titles} />
			{:else if key == chapterId}{/if}
		{/snippet}
	</MangaDexTabs>
</div>

<style lang="scss">
</style>
