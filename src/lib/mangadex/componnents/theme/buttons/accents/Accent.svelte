<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "../base/ButtonBase.svelte";

	interface Props extends HTMLButtonAttributes {
		isBase?: boolean;
		children?: import("svelte").Snippet;
	}

	let { isBase = false, children, ...restProps }: Props = $props();
</script>

<ButtonBase --button-color={"var(--button-accent)"} {isBase} {...restProps}>
	{@render children?.()}
</ButtonBase>
