<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import MidToneButton from "./MidToneButton.svelte";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		label: string;
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { label, isBase = false, ...restProps }: Props = $props();
</script>

<MidToneButton {isBase} {...restProps}>
	{label}
</MidToneButton>
