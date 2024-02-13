<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let type: "reset" | "submit" | "button" = "button";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let with_active: boolean = false;
	export let with_hover: boolean = false;
	export let style: string | undefined = undefined;
</script>

<button {style} class:with-active={with_active} class:with-hover={with_hover} on:click {type}>
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
		transition:
			background-color 100ms ease-in-out,
			filter 100ms ease-in-out;
		display: flex;
		align-items: center;
		border-color: var(--button-active);
		color: var(--text-color);
		background-color: var(--button-color);
		font-family: var(--fonts);
	}
	button.with-hover:hover {
		background-color: var(--button-hover);
	}
	button.with-active:active {
		background-color: var(--button-active);
	}
	button:not(.with-hover):hover {
		filter: brightness(85%);
	}
	button:not(.with-active):active {
		filter: brightness(70%);
	}
</style>
