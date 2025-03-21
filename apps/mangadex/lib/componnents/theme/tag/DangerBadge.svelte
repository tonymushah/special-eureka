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
	interface Props {
		type?: "default" | "l1" | "l2";
		children?: import('svelte').Snippet;
	}

	let { type = "default", children }: Props = $props();
</script>

{#if type == "l1"}
	<L1 on:click>
		{@render children?.()}
	</L1>
{:else if type == "l2"}
	<L2 on:click>
		{@render children?.()}
	</L2>
{:else}
	<Default on:click>
		{@render children?.()}
	</Default>
{/if}
