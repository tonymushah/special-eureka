<script lang="ts">
	import Content from "./Content.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import Layout from "./Layout.svelte";

	interface Events {
		onreadClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
		onmoreInfoClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}

	interface Props extends Events {
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		description: string;
		mangaId: string;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		description,
		mangaId,
		onmoreInfoClick,
		onreadClick
	}: Props = $props();
	let isHover = $state(false);
	let image = $derived($coverImage);
</script>

<Layout bind:isHover {mangaId}>
	{#if image}
		<img src={image} alt={coverImageAlt} />
	{:else}
		<Skeleton height={"var(--s-h)"} width={"var(--s-w)"} />
	{/if}
	<Content {title} {description} {isHover} {onmoreInfoClick} {onreadClick} />
</Layout>

<style lang="scss">
	:root {
		--transition-duration: 500ms;
		--transition-timing-function: ease-in-out;
		--width: 16em;
		--height: 23em;
		--height-c: 24em;
		--s-w: var(--width);
		--s-h: var(--height);
	}
	img {
		width: var(--width);
		height: var(--height);
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
