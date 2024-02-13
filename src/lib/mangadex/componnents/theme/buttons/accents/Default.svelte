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
</script>

<ButtonBase
	--button-color="var(--accent)"
	--button-hover="var(--accent-hover)"
	--button-active="var(--accent-active)"
	with_active
	with_hover
	{style}
	on:click
	{type}
>
	<slot />
</ButtonBase>
