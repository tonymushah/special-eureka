<script lang="ts">
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	export let color: "blue" | "gray" | "green" | "purple" | "red" | "yellow";
	export let variant: "light" | "filled" | "outline" | "dot" | "gradient" | undefined = undefined;
</script>

{#if color == "blue"}
	<Blue {variant}>
		<slot />
	</Blue>
{:else if color == "gray"}
	<Gray {variant}>
		<slot />
	</Gray>
{:else if color == "green"}
	<Green {variant}>
		<slot />
	</Green>
{:else if color == "purple"}
	<Purple {variant}>
		<slot />
	</Purple>
{:else if color == "red"}
	<Red {variant}>
		<slot />
	</Red>
{:else if color == "yellow"}
	<Yellow {variant}>
		<slot />
	</Yellow>
{/if}
