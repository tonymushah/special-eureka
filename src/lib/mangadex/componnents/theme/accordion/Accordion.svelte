<script lang="ts">
	import type { Snippet } from "svelte";
	import { ChevronDownIcon } from "svelte-feather-icons";
	import { slide } from "svelte/transition";

	interface Props {
		title: string;
		isOpen?: boolean;
		key?: string;
		withBorder?: boolean;
		titleBorder?: boolean;
		titleSlot?: Snippet;
		children?: Snippet;
	}
	let {
		title,
		isOpen = $bindable(false),
		key = "Enter",
		withBorder = false,
		titleBorder = false,
		titleSlot,
		children
	}: Props = $props();
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="accordion" class:isOpen class:withBorder>
	<div
		role="button"
		onclick={() => {
			toggle();
		}}
		onkeydown={({ key: keyDown }) => {
			if (keyDown == key) {
				toggle();
			}
		}}
		tabindex="0"
		class="title"
		class:withBorder
	>
		{#if titleSlot}
			{@render titleSlot()}
		{:else}
			<div class="default" class:titleBorder>
				<p>{title}</p>
				<div class="chevron" class:isOpen>
					<ChevronDownIcon />
				</div>
			</div>
		{/if}
	</div>
	{#if isOpen}
		<div transition:slide class="content">
			{@render children?.()}
		</div>
	{/if}
</div>

<style lang="scss">
	.accordion {
		transition: border 300ms ease-in-out;
		border-radius: 5px;
		color: var(--text-color);
		.title.withBorder {
			border-color: var(--mid-tone);
			border-bottom-width: 1px;
			border-bottom-style: solid;
		}
		.title {
			transition: border 300ms ease-in-out;
			.default {
				padding: 5px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.chevron {
					transition: rotate 300ms ease-in-out;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.chevron.isOpen {
					rotate: 180deg;
				}
			}
			p {
				margin: 0px;
			}
		}
	}

	.accordion.isOpen.withBorder:hover {
		.title {
			border-color: var(--mid-tone);
			border-bottom-width: 1px;
			border-bottom-style: solid;
		}
	}
	.accordion:not(.isOpen):hover {
		.title {
			border: none;
		}
	}
	.accordion.withBorder:hover {
		border-color: var(--mid-tone);
		border-width: 1px;
		border-style: solid;
	}
	.title {
		.default.titleBorder {
			border-color: var(--mid-tone);
			border-bottom-width: 1px;
			border-bottom-style: solid;
		}
	}
</style>
