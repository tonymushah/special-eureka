<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "./base/ButtonBase.svelte";

	interface Props extends HTMLButtonAttributes {
		isBase?: boolean;
	}

	let { isBase = false, ...restProps }: Props = $props();
</script>

<ButtonBase --button-color={"var(--mid-tone)"} {isBase} {...restProps} />
