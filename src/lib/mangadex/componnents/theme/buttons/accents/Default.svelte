<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "../base/ButtonBase.svelte";

	interface Props extends HTMLButtonAttributes {
		isBase?: boolean;
	}

	let { isBase = false, ...restProps }: Props = $props();
</script>

<ButtonBase
	--button-color="var(--accent)"
	--button-hover="var(--accent-hover)"
	--button-active="var(--accent-active)"
	with_active
	with_hover
	{isBase}
	{...restProps}
/>
