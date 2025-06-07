<script lang="ts">
	import MangaDexTabs, { type MangaDexTabTrigger } from "../theme/tabs/MangaDexTabs.svelte";

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
</script>

<div class="body">
	<MangaDexTabs bind:triggers>
		{#snippet children(key)}
			{#if key == titleId}{:else if key == chapterId}{/if}
		{/snippet}
	</MangaDexTabs>
</div>

<style lang="scss">
</style>
