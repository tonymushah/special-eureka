<script lang="ts" module>
	export type MangaDexTabTrigger = {
		id: string;
		title: string;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { createTabs, melt } from "@melt-ui/svelte";
	import type { Snippet } from "svelte";
	import MangaDexTabButton from "./MangaDexTabButton.svelte";
	interface Props {
		triggers: MangaDexTabTrigger[];
		defaultValue?: string;
		children?: Snippet<[string]>;
		fontSize?: "small" | "medium" | "large" | "larger" | string;
		fullHeight?: boolean;
		fillAvailableHeight?: boolean;
		flex?: boolean;
	}
	let {
		triggers = $bindable([]),
		defaultValue,
		children,
		fontSize = "medium",
		fullHeight,
		fillAvailableHeight,
		flex
	}: Props = $props();
	const {
		elements: { root, list },
		states: { value }
	} = createTabs({
		//defaultValue
	});
	$effect(() => {
		if (defaultValue) {
			value.set(defaultValue);
		}
	});
</script>

<div class="root" use:melt={$root} class:fullHeight class:fillAvailableHeight class:flex>
	<div class="list" use:melt={$list}>
		{#each triggers as triggerItem}
			<MangaDexTabButton
				disabled={triggerItem.disabled}
				id={triggerItem.id}
				title={triggerItem.title}
				{value}
				--button-font-size={fontSize}
			/>
		{/each}
	</div>
	<hr />
	{@render children?.($value)}
</div>

<style lang="scss">
	.root.fullHeight {
		height: 100%;
	}
	.root.fillAvailableHeight {
		height: -webkit-fill-available;
	}
	.root.flex {
		display: flex;
		flex-direction: column;
		hr {
			width: 100%;
			height: 1px;
		}
	}
	.list {
		display: flex;
		gap: 3px;
	}
	hr {
		color: var(--contrast-l1);
	}
</style>
