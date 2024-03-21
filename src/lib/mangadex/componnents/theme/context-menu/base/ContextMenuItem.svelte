<script lang="ts">
	import { SvelteComponent, createEventDispatcher, type ComponentType } from "svelte";
	export let icon: ComponentType;
	export let label: string;
	export let key: string | undefined = undefined;
	export let tabindex: number;
	export let isDisabled: boolean = false;
	let isFocused = false;
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();
</script>

<div
	role="button"
	on:click={(e) => {
		if (!isDisabled) {
			dispatch("click", e);
		}
	}}
	on:keypress={(e) => {
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
	<svelte:component this={icon} />
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
		font-size: var(--font-size);
	}
	p {
		margin: 0px;
		font-weight: 800;
	}
</style>
