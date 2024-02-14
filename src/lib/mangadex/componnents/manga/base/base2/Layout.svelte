<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<ButtonBase
	on:click
	isBase={false}
	noPadding
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l-active)"}
>
	<div class="layout">
		<slot />
	</div>
</ButtonBase>

<style lang="scss">
	div.layout {
		min-width: 10em;
		max-height: 11em;
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		border-radius: 0.25rem;
	}
</style>
