<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
</script>

<ButtonBase
	type="button"
	on:click
	isBase={false}
	noPadding
	--cover-image={coverImage}
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l3-active)"}
>
	<div class="layout-image" style={`background-image: url(${coverImage});`}>
		<div class="layout-color">
			<div class="layout">
				<slot />
			</div>
		</div>
	</div>
</ButtonBase>

<style lang="scss">
	.layout-image {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -400px;
	}
	.layout-color {
		background-color: color-mix(in srgb, var(--main-background) 70%, white 0%);
	}
	.layout {
		margin: var(--popular-element-layout-margin);
		backdrop-filter: blur(20px) opacity(20%);
		-webkit-backdrop-filter: blur(20px);
		display: flex;
		align-items: start;
		flex-direction: row;
	}
</style>
