<script lang="ts">
	import { emptyMeltElement, melt, type AnyMeltElement } from "@melt-ui/svelte";
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props {
		inputProps?: HTMLInputAttributes;
		value?: any;
		widthFull?: boolean;
		element?: AnyMeltElement;
	}

	let {
		inputProps = {},
		value = $bindable(undefined),
		widthFull = false,
		element = emptyMeltElement
	}: Props = $props();
</script>

<input {...inputProps} use:melt={$element} bind:value class:widthFull />

<style lang="scss">
	input {
		transition: background-color 0.25s ease-in-out;
		color: var(--text-color);
		background-color: var(--accent);
		box-shadow: 0px 0px 2px var(--accent);
		font-family: var(--fonts);
		font-size: var(--font-size);
		border-style: solid;
		border-radius: 0.25em;
		padding: 5px;
		border-color: var(--mid-tone);
	}
	input.widthFull {
		width: 100%;
	}
	input:hover {
		background-color: var(--accent-hover);
	}
	input:focus {
		background-color: var(--accent-active);
		border-style: dashed;
	}
	input:focus-visible {
		//border-style: dashed;
		outline: none;
	}
	input:-internal-autofill-selected {
		appearance: none;
		background-color: var(--accent-l1) !important;
		color: var(--text-color) !important;
	}
</style>
