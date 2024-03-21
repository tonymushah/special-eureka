<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { TopMangaStatistics } from "./stats";
	import BookmarkButton from "./stats/BookmarkButton.svelte";
	import CommentsButton from "./stats/CommentsButton.svelte";
	import Note from "./stats/Note.svelte";
	const dispatch = createEventDispatcher<{
		commentClick: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let stats: TopMangaStatistics;
</script>

<div class="stats">
	<Note bind:average={stats.average} bind:inner={stats.inner} />
	<BookmarkButton bind:bookmarks={stats.follows} />
	{#if stats.comments}
		<CommentsButton
			bind:comments={stats.comments}
			on:click={({ detail }) => {
				dispatch("commentClick", detail);
			}}
		/>
	{/if}
</div>

<style lang="scss">
	.stats {
		display: flex;
		gap: 10px;
		flex-direction: row;
	}
</style>
