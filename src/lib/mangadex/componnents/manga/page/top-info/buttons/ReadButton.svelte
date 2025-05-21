<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import ReadIcon from "./read/ReadIcon.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
		disabled?: boolean;
	}

	interface Props extends Events {}
	let { onclick, disabled }: Props = $props();
</script>

<ButtonAccent
	isBase
	onclick={(detail) => {
		onclick?.(detail);
	}}
	{disabled}
>
	<ReadIcon />
</ButtonAccent>
