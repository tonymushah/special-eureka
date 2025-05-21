<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import AddToListIcon from "./add-to-list/AddToListIcon.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
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
	onclick={(ev) => {
		onclick?.(ev);
	}}
	{disabled}
>
	<AddToListIcon />
</ButtonAccent>
