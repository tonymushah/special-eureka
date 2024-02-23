<script lang="ts">
	import ButtonBase from "../base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	export let type: "reset" | "submit" | "button" = "button";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let style: string | undefined = undefined;
	export let isBase = false;
</script>

<ButtonBase {isBase} --button-color={"var(--indication-blue)"} {style} on:click {type}>
	<slot />
</ButtonBase>
