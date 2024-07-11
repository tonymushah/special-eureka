<script lang="ts">
	import { LockIcon, UnlockIcon, XIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import { isDrawerFixedWritable } from "../../contexts/isDrawerFixed";
	import { isDrawerOpenWritable } from "../../contexts/isDrawerOpen";

	export let left = false;
	const open = isDrawerOpenWritable();
	const fixed = isDrawerFixedWritable();
	const fixed_ = derived(fixed, (f) => !f);
</script>

<section class="header" class:left>
	<div
		role="button"
		tabindex="0"
		on:click={() => {
			$open = !$open;
		}}
		on:keydown={(e) => {
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
		on:click={() => {
			$fixed = !$fixed;
		}}
		on:keydown={(e) => {
			if (e.key == "Enter") {
				$fixed = !$fixed;
			}
		}}
	>
		{#if $fixed_}
			<UnlockIcon />
		{:else}
			<LockIcon />
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
