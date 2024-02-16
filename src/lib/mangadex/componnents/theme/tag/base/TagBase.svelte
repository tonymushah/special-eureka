<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Badge } from "@svelteuidev/core";
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<Badge
	style={"font-size: var(--tag-font-size); font-weight: var(--tag-font-weight); background-color: var(--tag-color); color: var(--text-color); font-family: var(--fonts); padding: var(--tag-padding);"}
	on:click={({ detail }) => {
		dispatch("click", detail);
	}}
>
	<slot />
</Badge>
