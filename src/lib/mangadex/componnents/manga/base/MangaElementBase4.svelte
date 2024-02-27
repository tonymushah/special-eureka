<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
</script>

<ButtonBase on:click isBase={false} noPadding --button-color={"var(--main-background)"}>
	<div class="layout">
		<img src={coverImage} alt={coverImageAlt} />
		<div class="title">
			<span>{title}</span>
		</div>
	</div>
</ButtonBase>

<style lang="scss">
	img {
		width: 9.5em;
		height: 12.5em;
		object-fit: cover;
		border-radius: 0.25rem;
	}
	div.title > span {
		font-weight: 500;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		overflow: hidden;
		text-align: start;
		margin: 0px;
		padding: 5px;
		font-size: 16px;
	}
	.layout {
		width: 9.5em;
		overflow: hidden;
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
	}
</style>
