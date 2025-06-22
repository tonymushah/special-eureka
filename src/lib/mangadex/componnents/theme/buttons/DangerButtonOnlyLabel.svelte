<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import DangerButton from "./DangerButton.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "default" | "1" | "2";
		label: string;
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { variant = "default", label, isBase = false, ...restProps }: Props = $props();
</script>

<DangerButton {variant} {isBase} {...restProps}>
	{label}
</DangerButton>
