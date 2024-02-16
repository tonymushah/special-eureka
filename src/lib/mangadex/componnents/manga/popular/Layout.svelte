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
	<div class="layout-image">
		<div class="layout">
			<slot />
		</div>
	</div>
</ButtonBase>

<style lang="scss">
	.layout-image {
		background-image: var(--cover-image);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -400px;
	}
	.layout {
		background: var(--background-color + dd);
		backdrop-filter: blur(20px);
		display: flex;
		align-items: start;
		flex-direction: row;
	}
</style>
