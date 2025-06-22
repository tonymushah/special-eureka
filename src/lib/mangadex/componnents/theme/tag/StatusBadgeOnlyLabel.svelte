<script lang="ts">
	import type { StatusColor } from "@mangadex/utils/types/status";
	import StatusBadge from "./StatusBadge.svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		color: StatusColor;
		label: string;
	}

	let { color, label, ...restProps }: Props = $props();
</script>

<StatusBadge {color} {...restProps}>
	{label}
</StatusBadge>
