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
		console.debug("Opening");
		preventScroll();
	});
	onDestroy(() => {
		makeScroll();
		console.debug("Closing");
	});
</script>

<div class="body">
	<MangaDexTabs bind:triggers content>
		{#snippet children(key)}
			{#if key == titleId}
				<Titles {titles} />
			{:else if key == chapterId}{:else}
				<div class="nothing">
					<h2>Nothing selected</h2>
				</div>
			{/if}
		{/snippet}
	</MangaDexTabs>
</div>

<style lang="scss">
	.body {
		display: contents;
	}
	.nothing {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
