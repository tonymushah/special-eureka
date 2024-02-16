<script lang="ts">
	import Default from "./danger/Default.svelte";
	import L1 from "./danger/L1.svelte";
	import L2 from "./danger/L2.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let type: "default" | "l1" | "l2" = "default";
</script>

{#if type == "l1"}
	<L1 on:click>
		<slot />
	</L1>
{:else if type == "l2"}
	<L2 on:click>
		<slot />
	</L2>
{:else}
	<Default on:click>
		<slot />
	</Default>
{/if}
