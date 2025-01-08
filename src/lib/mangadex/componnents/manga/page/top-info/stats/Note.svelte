<script lang="ts">
	import type { TopMangaStatsInner } from ".";
	import NoteInner from "./note/NoteInner.svelte";
	import StarIcon from "./note/StarIcon.svelte";

	interface Props {
		average: number;
		inner: TopMangaStatsInner;
	}

	let { average, inner = $bindable() }: Props = $props();
	let target: HTMLButtonElement | undefined = $state(undefined);
	let isOpen = $state(false);
	let _average = $derived(average.toFixed(2));
</script>

<button
	class="note"
	onclick={() => {
		isOpen = !isOpen;
	}}
	bind:this={target}
>
	<StarIcon />
	<span>{_average}</span>
</button>

<NoteInner bind:target bind:inner bind:isOpen />

<style lang="scss">
	.note {
		background-color: var(--main-background);
		color: var(--primary);
		border: none;
		display: flex;
		flex-direction: row;
		gap: 5px;
		align-items: center;
		justify-content: center;
		border-radius: 0.25em;
		transition: background-color 300ms ease-in-out;
		span {
			font-size: var(--font-size);
			font-weight: 700;
			font-family: var(--fonts);
		}
	}
	.note:hover {
		background-color: var(--accent-l1);
	}
</style>
