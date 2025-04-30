<script lang="ts">
	import type { TopMangaStatistics } from "./stats";
	import BookmarkButton from "./stats/BookmarkButton.svelte";
	import CommentsButton from "./stats/CommentsButton.svelte";
	import Note from "./stats/Note.svelte";

	interface Events {
		oncommentClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}
	interface Props extends Events {
		stats: TopMangaStatistics;
	}

	let { stats = $bindable(), oncommentClick }: Props = $props();
</script>

<div class="stats">
	<Note average={stats.average} bind:inner={stats.inner} />
	<BookmarkButton bookmarks={stats.follows} />
	{#if stats.comments}
		<CommentsButton
			comments={stats.comments}
			onclick={(detail) => {
				oncommentClick?.(detail);
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
