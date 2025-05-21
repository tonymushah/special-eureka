<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import UploadIcon from "./upload/UploadIcon.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}
	interface Props extends Events {
		disabled?: boolean;
	}

	let { onclick, disabled }: Props = $props();
</script>

<ButtonAccent
	isBase
	onclick={(detail) => {
		onclick?.(detail);
	}}
	{disabled}
>
	<UploadIcon />
</ButtonAccent>
