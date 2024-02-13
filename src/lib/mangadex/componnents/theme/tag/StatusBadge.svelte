<script lang="ts">
	import Blue from "./status/Blue.svelte";
	import Gray from "./status/Gray.svelte";
	import Green from "./status/Green.svelte";
	import Purple from "./status/Purple.svelte";
	import Red from "./status/Red.svelte";
	import Yellow from "./status/Yellow.svelte";
	export let color: "blue" | "gray" | "green" | "purple" | "red" | "yellow";
</script>

{#if color == "blue"}
	<Blue>
		<slot />
	</Blue>
{:else if color == "gray"}
	<Gray>
		<slot />
	</Gray>
{:else if color == "green"}
	<Green>
		<slot />
	</Green>
{:else if color == "purple"}
	<Purple>
		<slot />
	</Purple>
{:else if color == "red"}
	<Red>
		<slot />
	</Red>
{:else if color == "yellow"}
	<Yellow>
		<slot />
	</Yellow>
{/if}
