<script lang="ts">
	import type { AnyMeltElement } from "@melt-ui/svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import ButtonBase from "./base/ButtonBase.svelte";

	interface Props extends HTMLButtonAttributes {
		variant?: "default" | "1" | "2" | "3" | "4" | "5" | "accent" | "accent-alt";
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { variant = "default", isBase = false, ...restProps }: Props = $props();
	let buttonColor = $derived.by(() => {
		switch (variant) {
			case "default":
				return "var(--accent)";
			case "1":
				return "var(--accent-l1)";
			case "2":
				return "var(--accent-l2)";
			case "3":
				return "var(--accent-l3)";
			case "4":
				return "var(--accent-l4)";
			case "5":
				return "var(--accent-l5)";
			case "accent":
				return "var(--button-accent)";
			case "accent-alt":
				return "var(--button-accent-alt)";
			default:
				return "var(--accent)";
		}
	});
	let buttonColorHover = $derived.by(() => {
		switch (variant) {
			case "default":
				return "var(--accent-hover)";
			case "1":
				return "var(--accent-l1-hover)";
			case "2":
				return "var(--accent-l2-hover)";
			case "3":
				return "var(--accent-l3-hover)";
			case "4":
				return "var(--accent-l4-hover)";
			case "5":
				return "var(--accent-l5-hover)";
			case "accent":
				return "var(--button-accent)";
			case "accent-alt":
				return "var(--button-accent-alt)";
			default:
				return "var(--accent-hover)";
		}
	});
	let buttonColorActive = $derived.by(() => {
		switch (variant) {
			case "default":
				return "var(--accent-active)";
			case "1":
				return "var(--accent-l1-active)";
			case "2":
				return "var(--accent-l2-active)";
			case "3":
				return "var(--accent-l3-active)";
			case "4":
				return "var(--accent-l4-active)";
			case "5":
				return "var(--accent-l5-active)";
			case "accent":
				return "var(--button-accent)";
			case "accent-alt":
				return "var(--button-accent-alt)";
			default:
				return "var(--accent-active)";
		}
	});
	let with_hover = $derived(variant != "accent" && variant != "accent-alt");
	let with_active = $derived(variant != "accent" && variant != "accent-alt");
</script>

<ButtonBase
	--button-color={buttonColor}
	--button-hover={buttonColorHover}
	--button-active={buttonColorActive}
	{with_active}
	{with_hover}
	{isBase}
	{...restProps}
/>
