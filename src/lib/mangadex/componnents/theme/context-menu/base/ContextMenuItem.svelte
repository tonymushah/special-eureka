<script lang="ts">
	import { melt, type AnyMeltElement, emptyMeltElement } from "@melt-ui/svelte";
	import { createEventDispatcher, type ComponentType } from "svelte";
	interface Props {
		icon: ComponentType;
		label: string;
		key?: string | undefined;
		tabindex: number;
		isDisabled?: boolean;
		element?: AnyMeltElement;
	}

	let {
		icon,
		label,
		key = undefined,
		tabindex,
		isDisabled = false,
		element = emptyMeltElement
	}: Props = $props();
	let isFocused = $state(false);
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();

	const SvelteComponent_1 = $derived(icon);
</script>

<div
	use:melt={$element}
	role="button"
	onm-click={(e) => {
		if (!isDisabled) {
			dispatch("click", e);
		}
	}}
	onkeypress={(e) => {
		if (e.key == key) {
			isFocused = true;
		} else {
			isFocused = false;
		}
	}}
	{tabindex}
	class="menu-item"
	class:isDisabled
>
	{#if SvelteComponent_1}
		<SvelteComponent_1 class="icon" />
	{/if}
	<p class="label">{label}</p>
</div>

<style lang="scss">
	div.menu-item {
		transition: background-color 300ms ease-in-out;
		background-color: var(--accent-l3);
		display: flex;
		color: var(--text-color);
		align-items: center;
		gap: 5px;
		padding: var(--menu-item-padding);
		cursor: pointer;
	}
	.icon {
		width: var(--context-menu-font-size);
		height: var(--context-menu-font-size);
		display: flex;
		align-self: center;
		justify-content: center;
	}
	div.menu-item.isDisabled {
		cursor: not-allowed;
	}
	div.menu-item:hover {
		background-color: var(--accent-l3-hover);
	}
	div.menu-item:active {
		background-color: var(--accent-l3-active);
	}
	p.label {
		font-size: var(--context-menu-font-size);
	}
	p {
		margin: 0px;
		font-weight: 500;
	}
</style>
