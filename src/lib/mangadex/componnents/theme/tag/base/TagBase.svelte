<script lang="ts">
	import ButtonBase from "../../buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<ButtonBase on:click noPadding --button-color="var(--tag-color)" --text-color="var(--text-color)">
	<span>
		<slot />
	</span>
</ButtonBase>

<style lang="scss">
	span {
		font-size: var(--tag-font-size);
		font-weight: var(--tag-font-weight);
		font-family: var(--fonts);
		padding: var(--tag-padding);
	}
</style>
