<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();
	interface Props {
		name: string;
		id: string;
	}

	let { name, id }: Props = $props();
</script>

<ButtonBase
	with_hover
	with_active
	onclick={({ detail }) => {
		dispatch("click", {
			...detail,
			id
		});
	}}
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l3-active)"}
>
	{name}
</ButtonBase>
