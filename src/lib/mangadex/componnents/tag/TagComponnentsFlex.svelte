<script lang="ts">
	import TagComponnents from "./TagComponnents.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();
	type Tag = {
		id: string;
		name: string;
	};
	export let tags: Tag[];
</script>

<div>
	<TagComponnents on:click {tags} />
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
</style>
