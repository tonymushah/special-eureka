<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import PrimaryButton from "./PrimaryButton.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		variant?: "default" | "1" | "2";
		label: string;
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { variant = "default", label, isBase = false, ...restProps }: Props = $props();
</script>

<PrimaryButton {variant} {isBase} {...restProps}>
	{label}
</PrimaryButton>
