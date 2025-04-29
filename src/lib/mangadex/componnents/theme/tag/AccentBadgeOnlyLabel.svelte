<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import AccentBadge from "./AccentBadge.svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		label: string;
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
	}

	let { label, variant = "default", ...restProps }: Props = $props();
</script>

<AccentBadge {variant} {...restProps}>
	{label}
</AccentBadge>
