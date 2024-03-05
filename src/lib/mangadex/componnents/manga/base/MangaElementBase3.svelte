<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";
	import Content from "./base3/Content.svelte";

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
		<Content {title} />
	</div>
</ButtonBase>

<style lang="scss">
	img {
		width: 10em;
		height: 15em;
		object-fit: cover;
		border-radius: 0.25rem;
	}

	.layout {
		width: 10em;
		height: 15em;
		overflow: hidden;
		border-radius: 0.25rem;
	}
</style>
