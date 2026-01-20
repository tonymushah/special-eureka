<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import MidToneButton from "./MidToneButton.svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		label: string;
		isBase?: boolean;
	}

	let { label, isBase = false, ...restProps }: Props = $props();
</script>

<MidToneButton {isBase} {...restProps}>
	{label}
</MidToneButton>
