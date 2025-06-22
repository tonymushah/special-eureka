<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import StatusButton from "./StatusButton.svelte";
	import type { StatusColor } from "@mangadex/utils/types/status";
	import type { AnyMeltElement } from "@melt-ui/svelte";

	interface Props extends Omit<HTMLButtonAttributes, "children"> {
		color: StatusColor;
		label: string;
		isBase?: boolean;
		meltElement?: AnyMeltElement;
	}

	let { color, isBase = false, label, ...restProps }: Props = $props();
</script>

<StatusButton {isBase} {color} {...restProps}>
	{label}
</StatusButton>
