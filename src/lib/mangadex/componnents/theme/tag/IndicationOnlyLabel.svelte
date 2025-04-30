<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import IndicationBadge from "./IndicationBadge.svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "blue";
		label: string;
	}

	let { variant = "blue", label, ...restProps }: Props = $props();
</script>

<IndicationBadge {variant} {...restProps}>
	{label}
</IndicationBadge>
