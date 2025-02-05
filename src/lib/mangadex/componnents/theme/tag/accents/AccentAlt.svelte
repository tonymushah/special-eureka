<script lang="ts">
	import TagBase from "../base/TagBase.svelte";
	import { createEventDispatcher } from "svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<TagBase on:click --tag-color="var(--button-accent-alt)">
	{@render children?.()}
</TagBase>
