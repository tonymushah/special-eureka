<script lang="ts">
	import { TagSearchMode } from "@mangadex/gql/graphql";
	import type { Writable } from "svelte/store";
	import { tagModeWritableToBoolWritable } from "../../contexts/tagModes";
	import { createToggle, melt } from "@melt-ui/svelte";

	export let writableTag: Writable<TagSearchMode>;
	export let trueValue = TagSearchMode.And;
	$: toUse = tagModeWritableToBoolWritable(writableTag, trueValue);

	$: toggle = createToggle({
		pressed: toUse
	});
	$: root = toggle.elements.root;
	$: pressed = toggle.states.pressed;
</script>

<button use:melt={$root}>
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
