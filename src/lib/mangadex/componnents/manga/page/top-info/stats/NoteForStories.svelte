<script lang="ts">
	import type { TopMangaStatsInner } from ".";
	import Note from "./Note.svelte";

	export let average: number;
	export let inner: TopMangaStatsInner;
</script>

<div class="center">
	<Note bind:average bind:inner />
</div>

<style lang="scss">
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
