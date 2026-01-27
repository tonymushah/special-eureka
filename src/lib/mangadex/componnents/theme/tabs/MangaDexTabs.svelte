<script lang="ts" module>
	export type MangaDexTabTrigger = {
		id: string;
		title: string;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import MangaDexTabButton from "./MangaDexTabButton.svelte";
	import { Tabs } from "@ark-ui/svelte/tabs";
	import cssMod from "./tabs.module.scss";

	interface Props {
		triggers: MangaDexTabTrigger[];
		defaultValue?: string;
		children?: Snippet;
		fontSize?: "small" | "medium" | "large" | "larger" | string;
		fullHeight?: boolean;
		fillAvailableHeight?: boolean;
		flex?: boolean;
		content?: boolean;
		unmountOnExit?: boolean;
		lazyMount?: boolean;
		manual?: boolean;
	}
	let {
		triggers = $bindable([]),
		children,
		fontSize = "medium",
		fullHeight,
		fillAvailableHeight,
		flex,
		content,
		defaultValue,
		unmountOnExit,
		lazyMount,
		manual
	}: Props = $props();
</script>

<Tabs.Root
	{unmountOnExit}
	{lazyMount}
	{defaultValue}
	class={[
		cssMod.root,
		fullHeight && cssMod.fullHeight,
		fillAvailableHeight && cssMod.fillAvailableHeight,
		flex && cssMod.flex,
		content && cssMod.content
	]}
	activationMode={manual ? "manual" : "automatic"}
>
	<!-- class:root={true}
		class:fullHeight
		class:fillAvailableHeight
		class:flex
		class:content -->
	<Tabs.List class={cssMod.list}>
		{#each triggers as triggerItem}
			<MangaDexTabButton
				disabled={triggerItem.disabled}
				value={triggerItem.id}
				--button-font-size={fontSize}>{triggerItem.title}</MangaDexTabButton
			>
		{/each}
		<Tabs.Indicator class={cssMod.indicator} style="width: var(--width)" />
	</Tabs.List>
	<hr />
	{@render children?.()}
</Tabs.Root>

<style lang="scss">
	hr {
		width: 100%;
		height: 1px;
	}

	hr {
		color: var(--contrast-l1);
	}
</style>
