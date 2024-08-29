<script lang="ts">
	import type { HTMLInputTypeAttribute } from "svelte/elements";

	export let type: HTMLInputTypeAttribute = "text";
	export let value: any = "";
	export let name: string | null | undefined = undefined;
	export let placeholder: string | null | undefined = undefined;
	export let widthFull = false;
</script>

<input {type} {value} {name} class:widthFull {placeholder} />

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
