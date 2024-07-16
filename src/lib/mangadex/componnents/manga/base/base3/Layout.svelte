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
	<article class="layout">
		<slot />
	</article>
</ButtonBase>

<style lang="scss">
	.layout {
		width: var(--element-w);
		height: var(--element-h);
		overflow: hidden;
		border-radius: 0.25rem;
	}
</style>
