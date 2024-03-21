<script lang="ts">
	import millify from "millify";
	import BookMarkIcon from "./bookmark/BookMarkIcon.svelte";
	export let bookmarks: number;
	let shouldSuspend = false;
	let isMillify = true;
	$: bookmarks_ = isMillify ? millify(bookmarks) : bookmarks;
</script>

<button
	class="bookmarks"
	on:mouseenter={() => {
		if (!shouldSuspend) isMillify = false;
	}}
	on:mouseleave={() => {
		if (!shouldSuspend) isMillify = true;
	}}
	on:click={() => {
		shouldSuspend = !shouldSuspend;
	}}
>
	<BookMarkIcon />
	<span>{bookmarks_}</span>
</button>

<style lang="scss">
	.bookmarks {
		display: flex;
		background-color: var(--main-background);
		color: var(--text-color);
		font-family: var(--fonts);
		font-size: var(--font-size);
		border: none;
		border-radius: 0.25em;
		gap: 5px;
		justify-content: center;
		align-items: center;
		transition: background-color 200ms ease-in-out;
		span {
			font-weight: 600;
		}
	}
	.bookmarks:hover {
		background-color: var(--contrast-l1);
	}
	.bookmarks:active {
		background-color: var(--primary);
	}
</style>
