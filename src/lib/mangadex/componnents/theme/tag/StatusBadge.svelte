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
	<Blue {variant} />
{:else if color == "gray"}
	<Gray {variant} />
{:else if color == "green"}
	<Green {variant} />
{:else if color == "purple"}
	<Purple {variant} />
{:else if color == "red"}
	<Red {variant} />
{:else if color == "yellow"}
	<Yellow {variant} />
{/if}
