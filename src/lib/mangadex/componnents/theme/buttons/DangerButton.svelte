<script lang="ts">
	import type { AnyMeltElement } from "@melt-ui/svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "./base/ButtonBase.svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "default" | "1" | "2";
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { variant = "default", isBase = false, ...restProps }: Props = $props();
	let buttonColor = $derived.by(() => {
		switch (variant) {
			case "default":
				return "var(--danger)";
			case "1":
				return "var(--danger-l1)";
			case "2":
				return "var(--danger-l2)";
			default:
				return "var(--danger)";
		}
	});
</script>

<ButtonBase --button-color={buttonColor} {isBase} {...restProps} />
