<script lang="ts">
	import { XIcon } from "svelte-feather-icons";
	import { RiPushpinLine, RiUnpinLine } from "svelte-remixicon";
	import { derived } from "svelte/store";
	import { isDrawerFixedWritable } from "../../contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "../../contexts/isDrawerOpen";

	interface Props {
		left?: boolean;
	}

	let { left = false }: Props = $props();
	const open = isDrawerOpenWritable();
	const fixed = isDrawerFixedWritable();
	const fixed_ = derived(fixed, (f) => !f);
</script>

<section class="header" class:left>
	<div
		role="button"
		tabindex="0"
		onclick={() => {
			$open = !$open;
		}}
		onkeydown={(e) => {
			if (e.key == "Enter") {
				$open = !$open;
			}
		}}
	>
		<XIcon />
	</div>
	<div
		role="button"
		tabindex="0"
		onclick={() => {
			$fixed = !$fixed;
		}}
		onkeydown={(e) => {
			if (e.key == "Enter") {
				$fixed = !$fixed;
			}
		}}
	>
		{#if $fixed_}
			<RiPushpinLine size="24" />
		{:else}
			<RiUnpinLine size="24" />
		{/if}
	</div>
</section>

<style lang="scss">
	section.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		div {
			display: flex;
			align-items: center;
			justify-content: center;
			transition: background-color 200ms ease-in-out;
			border-radius: 0.25em;
			padding: 2px;
		}
		div:hover {
			background-color: var(--accent-l1-hover);
		}
		div:active {
			background-color: var(--accent-l1-active);
		}
	}
	section.header.left {
		flex-direction: row-reverse;
	}
</style>
