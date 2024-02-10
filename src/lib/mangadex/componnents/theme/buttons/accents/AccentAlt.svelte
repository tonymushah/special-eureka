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
		transition: filter 100ms ease-in-out;
		display: flex;
		align-items: center;
		color: var(--text-color);
		background-color: var(--button-accent-alt);
		font-family: var(--fonts);
	}
	button:hover {
		filter: brightness(85%);
	}
	button:active {
		filter: brightness(70%);
	}
</style>
