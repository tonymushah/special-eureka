<script lang="ts">
	import { TagSearchMode } from "@mangadex/gql/graphql";
	import type { Writable } from "svelte/store";
	import { tagModeWritableToBoolWritable } from "../../contexts/tagModes";

	interface Props {
		writableTag: Writable<TagSearchMode>;
		trueValue?: TagSearchMode;
	}

	let { writableTag, trueValue = TagSearchMode.And }: Props = $props();
	let toUse = $derived(tagModeWritableToBoolWritable(writableTag, trueValue));
</script>

<button
	onclick={() => {
		toUse.update((d) => (d = !d));
	}}
>
	<div class:selected={$writableTag == TagSearchMode.And}>And</div>
	<div class:selected={$writableTag == TagSearchMode.Or}>Or</div>
</button>

<style lang="scss">
	button {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 10px;
		padding: 5px;
		transition: background-color 200ms ease-in-out;
		background-color: var(--accent-l1);
		color: var(--text-color);
		font-size: var(--font-size);
		font-family: var(--fonts);
		border: none;
		border-radius: 0.25em;
		div {
			padding-left: 10px;
			padding-right: 10px;
			border-radius: 0.25em;
			transition: background-color 200ms ease-in-out;
		}
		div.selected {
			background-color: var(--primary-l1);
			font-weight: 600;
		}
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
</style>
