<script lang="ts">
	import TagComponnents from "./TagComponnents.svelte";
	import { createEventDispatcher, type Snippet } from "svelte";

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
	interface Props {
		tags: Tag[];
		pre?: Snippet;
		post?: Snippet;
	}

	let { tags, pre, post }: Props = $props();
</script>

<div>
	{@render pre?.()}
	<TagComponnents on:click {tags} />
	{@render post?.()}
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
</style>
