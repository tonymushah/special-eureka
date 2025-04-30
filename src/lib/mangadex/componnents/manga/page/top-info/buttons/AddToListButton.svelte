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
	interface Props extends Events {}
	let { onclick }: Props = $props();
</script>

<ButtonAccent
	isBase
	onclick={(ev) => {
		onclick?.(ev);
	}}
>
	<AddToListIcon />
</ButtonAccent>
