<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let type: "reset" | "submit" | "button" = "button";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let style: string | undefined = undefined;
</script>

<button {style} on:click {type}>
	<slot />
</button>

<style lang="scss">
	button {
		font-size: var(--font-size);
		min-height: 3em;
		min-width: 3em;
		border-radius: 0.25rem;
		border: 0;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		transition: background-color 100ms ease-in-out;
		display: flex;
		align-items: center;
		border-color: var(--accent-active);
		color: var(--text-color);
		background-color: var(--accent);
		font-family: var(--fonts);
	}
	button:hover {
		background-color: var(--accent-hover);
	}
	button:active {
		background-color: var(--accent-active);
	}
</style>
