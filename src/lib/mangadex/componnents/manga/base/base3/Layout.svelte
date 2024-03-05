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
	with_hover
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
	.layout {
		width: 10em;
		height: 15em;
		overflow: hidden;
		border-radius: 0.25rem;
	}
</style>
