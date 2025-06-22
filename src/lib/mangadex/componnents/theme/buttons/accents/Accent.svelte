<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "../base/ButtonBase.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends HTMLButtonAttributes {
		isBase?: boolean;
		children?: import("svelte").Snippet;
		meltElement?: AnyMeltElement;
	}

	let { isBase = false, children, ...restProps }: Props = $props();
</script>

<ButtonBase --button-color={"var(--button-accent)"} {isBase} {...restProps}>
	{@render children?.()}
</ButtonBase>
