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
		<img src={coverImage} alt={coverImageAlt} />
		<div class="title">
			<p>{title}</p>
		</div>
	</div>
</ButtonBase>

<style lang="scss">
	img {
		width: 10em;
		height: 15em;
		object-fit: cover;
		border-radius: 0.25rem;
	}
	div.title {
		width: 10em;
		height: 16em;
		top: -16em;
		position: relative;
		display: flex;
		align-items: end;
		opacity: 1;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent-l3) 100%);
		border-radius: 0.25rem;
		transition: opacity 300ms ease-in-out;
	}
	div.title > p {
		font-weight: 700;
	}
	div.title:hover {
		opacity: 0;
	}
	.layout {
		width: 10em;
		height: 15em;
		overflow: hidden;
		border-radius: 0.25rem;
	}
</style>
