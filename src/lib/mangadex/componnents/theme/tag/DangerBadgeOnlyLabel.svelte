<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import DangerBadge from "./DangerBadge.svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "default" | "l1" | "l2";
		label: string;
	}

	let { variant = "default", label, ...restProps }: Props = $props();
</script>

<DangerBadge {variant} {...restProps}>
	{label}
</DangerBadge>
