<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import Default from "./danger/Default.svelte";
	import L1 from "./danger/L1.svelte";
	import L2 from "./danger/L2.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";
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
