<script lang="ts">
	import type { Snippet } from "svelte";
	import { Tabs } from "@ark-ui/svelte/tabs";
	import cssMod from "./button.module.scss";
	interface Props {
		value: string;
		children?: Snippet;
		disabled?: boolean;
	}
	let { value, children, disabled }: Props = $props();
</script>

<Tabs.Trigger {value} {disabled} class={cssMod.trigger}>
	{@render children?.()}
</Tabs.Trigger>
