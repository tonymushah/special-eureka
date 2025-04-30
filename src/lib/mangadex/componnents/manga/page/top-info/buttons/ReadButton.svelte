<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import ReadIcon from "./read/ReadIcon.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}

	interface Props extends Events {}
	let { onclick }: Props = $props();
</script>

<ButtonAccent
	isBase
	onclick={(detail) => {
		onclick?.(detail);
	}}
>
	<ReadIcon />
</ButtonAccent>
