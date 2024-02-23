<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ButtonBase from "../base/ButtonBase.svelte";
	export let type: "reset" | "submit" | "button" = "button";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let style: string | undefined = undefined;
	export let isBase = false;
</script>

<ButtonBase
	--button-color="var(--accent-l2)"
	--button-hover="var(--accent-l2-hover)"
	--button-active="var(--accent-l2-active)"
	with_active
	with_hover
	{style}
	on:click
	{type}
	{isBase}
>
	<slot />
</ButtonBase>
