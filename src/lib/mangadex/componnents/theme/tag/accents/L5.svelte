<script lang="ts">
	import TagBase from "../base/TagBase.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<TagBase on:click --tag-color="var(--accent-l5)">
	<slot />
</TagBase>
