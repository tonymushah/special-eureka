<script lang="ts">
	import { type Component } from "svelte";
	import cssMod from "./menu-base-item.module.scss";
	interface Props {
		icon: Component;
		label: string;
		key?: string | undefined;
		tabindex: number;
		isDisabled?: boolean;
		onClick: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => unknown;
	}

	let { icon, label, tabindex, isDisabled = false, onClick }: Props = $props();

	const SvelteComponent_1 = $derived(icon);
</script>

<button
	onclick={(e) => {
		if (!isDisabled) {
			onClick(e);
		}
	}}
	{tabindex}
	class="menu-item"
	class:isDisabled
>
	{#if SvelteComponent_1}
		<SvelteComponent_1 class={cssMod.icon} />
	{/if}
	<p class="label">{label}</p>
</button>

<style lang="scss">
	.menu-item {
		transition: background-color 300ms ease-in-out;
		background-color: var(--accent-l3);
		display: flex;
		color: var(--text-color);
		align-items: center;
		gap: 5px;
		padding: var(--menu-item-padding);
		cursor: pointer;
	}
	.menu-item.isDisabled {
		cursor: not-allowed;
	}
	.menu-item:hover {
		background-color: var(--accent-l3-hover);
	}
	.menu-item:active {
		background-color: var(--accent-l3-active);
	}
	p.label {
		font-size: var(--context-menu-font-size);
		text-wrap: nowrap;
	}
	p {
		margin: 0px;
		font-weight: 500;
	}
</style>
