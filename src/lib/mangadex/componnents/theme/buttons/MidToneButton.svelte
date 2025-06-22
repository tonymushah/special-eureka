<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "./base/ButtonBase.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends HTMLButtonAttributes {
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { isBase = false, ...restProps }: Props = $props();
</script>

<ButtonBase --button-color={"var(--mid-tone)"} {isBase} {...restProps} />
