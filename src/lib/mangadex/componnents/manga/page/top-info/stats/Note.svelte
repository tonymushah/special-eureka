<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import type { TopMangaStatsInner } from ".";
	import NoteInner from "./note/NoteInner.svelte";
	import StarIcon from "./note/StarIcon.svelte";

	export let average: number;
	export let inner: TopMangaStatsInner;
	let target: HTMLButtonElement | undefined = undefined;
	let isOpen = false;
</script>

<button
	class="note"
	on:click={() => {
		isOpen = !isOpen;
	}}
	bind:this={target}
>
	<StarIcon />
	<span>{average}</span>
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
