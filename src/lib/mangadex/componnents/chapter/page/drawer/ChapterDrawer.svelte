<script lang="ts">
	import { derived } from "svelte/store";
	import { isDrawerFixedWritable } from "../contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import ChapterDrawerBase from "./base/ChapterDrawerBase.svelte";
	import ChapterDrawerContent from "./ChapterDrawerContent.svelte";

	const open = isDrawerOpenWritable();
	const fixed = isDrawerFixedWritable();
	const fixed_ = derived(fixed, (f) => !f);
	interface Props {
		left?: boolean;
		children?: import("svelte").Snippet;
	}

	let { left, children }: Props = $props();
</script>

<ChapterDrawerBase open={$open} fixed={$fixed_} {left}>
	<ChapterDrawerContent {left} />
	{#snippet content()}
		<div class="main">
			{@render children?.()}
		</div>
	{/snippet}
</ChapterDrawerBase>

<style lang="scss">
	.main {
		display: contents;
	}
</style>
