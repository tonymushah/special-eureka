<script lang="ts">
	import { type Snippet } from "svelte";
	import TagComponnents from "./TagComponnents.svelte";

	type Tag = {
		id: string;
		name: string;
	};
	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
		tags: Tag[];
		pre?: Snippet;
		post?: Snippet;
		nowrap?: boolean;
	}

	let { tags, pre, post, onclick, nowrap }: Props = $props();
</script>

<div class:nowrap>
	{@render pre?.()}
	<TagComponnents {onclick} {tags} />
	{@render post?.()}
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	div.nowrap {
		flex-wrap: nowrap;
	}
</style>
