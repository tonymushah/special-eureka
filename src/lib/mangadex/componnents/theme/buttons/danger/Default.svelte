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

<ButtonBase --button-color={"var(--danger)"} {style} on:click {type} {isBase}>
	<slot />
</ButtonBase>
