<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import MidToneBadge from "./MidToneBadge.svelte";

	interface Props extends HTMLButtonAttributes {
		label: string;
	}

	let { label, ...restProps }: Props = $props();
</script>

<MidToneBadge {...restProps}>
	{label}
</MidToneBadge>
