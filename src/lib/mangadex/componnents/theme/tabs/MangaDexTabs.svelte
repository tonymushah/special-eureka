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
	}
	let { triggers = $bindable([]), defaultValue, children, fontSize = "medium" }: Props = $props();
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

<div class="root" use:melt={$root}>
	<div class="list" use:melt={$list}>
		{#each triggers as triggerItem}
			<MangaDexTabButton
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
	.list {
		display: flex;
		gap: 3px;
	}
	hr {
		color: var(--contrast-l1);
	}
</style>
