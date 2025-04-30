<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { createEventDispatcher } from "svelte";
	import AddToListIcon from "./add-to-list/AddToListIcon.svelte";

	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<ButtonAccent
	isBase
	onclick={({ detail }) => {
		dispatch("click", detail);
	}}
>
	<AddToListIcon />
</ButtonAccent>
