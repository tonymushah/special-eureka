<script lang="ts">
	import type { HTMLInputTypeAttribute } from "svelte/elements";

	export let type: "text" | "number" | "email" | "url" | "file" | "color" = "text";
	export let value: any = "";
	export let name: string | null | undefined = undefined;
	export let placeholder: string | null | undefined = undefined;
	export let disabled = false;
	export let widthFull = false;
</script>

{#if type == "color"}
	<input {disabled} type="color" bind:value {name} class:widthFull {placeholder} />
{:else if type == "email"}
	<input {disabled} type="email" bind:value {name} class:widthFull {placeholder} />
{:else if type == "file"}
	<input {disabled} type="file" bind:value {name} class:widthFull {placeholder} />
{:else if type == "number"}
	<input {disabled} type="number" bind:value {name} class:widthFull {placeholder} />
{:else if type == "url"}
	<input {disabled} type="url" bind:value {name} class:widthFull {placeholder} />
{:else}
	<input {disabled} bind:value {name} class:widthFull {placeholder} />
{/if}

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
