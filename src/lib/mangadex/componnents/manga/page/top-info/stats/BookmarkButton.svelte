<script lang="ts">
	import millify from "millify";
	import BookMarkIcon from "./bookmark/BookMarkIcon.svelte";
	export let bookmarks: number;
	let isMillify = true;
	$: bookmarks_ = isMillify ? millify(bookmarks) : bookmarks;
</script>

<button
	class="bookmarks"
	on:click={() => {
		isMillify = !isMillify;
	}}
>
	<BookMarkIcon />
	<span>{bookmarks_}</span>
</button>
