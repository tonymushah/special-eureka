<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import IndicationButton from "./IndicationButton.svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "blue";
		label: string;
		isBase?: boolean;
	}

	let { variant = "blue", label, isBase = false, ...restProps }: Props = $props();
</script>

<IndicationButton {variant} {isBase} {...restProps}>
	{label}
</IndicationButton>
