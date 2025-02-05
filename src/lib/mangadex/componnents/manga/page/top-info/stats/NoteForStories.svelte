<script lang="ts">
	import type { TopMangaStatsInner } from ".";
	import Note from "./Note.svelte";

	interface Props {
		average: number;
		inner: TopMangaStatsInner;
	}

	let { average = $bindable(), inner = $bindable() }: Props = $props();
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
